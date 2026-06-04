/**
 * Database Dump & Image Sync Script
 *
 * Dumps a remote PostgreSQL database, loads it into local database,
 * and downloads remote images to local storage.
 *
 * SAFETY: This script WRITES to DATABASE_URL. It will refuse to run if
 * DATABASE_URL appears to point to a production database (Neon, Vercel, etc).
 *
 * Usage:
 *   npm run db:dump:remote           # Uses REMOTE_DATABASE_URL from env
 *   npm run db:dump:remote:dry       # Preview changes without running
 *   npm run db:dump:remote:noimg     # Skip image downloading
 *
 * Options:
 *   --skip-images    Skip downloading images
 *   --dry-run        Show what would be done without making changes
 *   --force          Bypass production database safety check (DANGEROUS)
 *
 * Environment variables:
 *   - DATABASE_URL: Local database (where data is written) - MUST be local!
 *   - REMOTE_DATABASE_URL: Remote database (source of data, read-only)
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import { createWriteStream } from 'fs';
import * as https from 'https';
import * as http from 'http';

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message: string) {
  log(message, 'red');
}

function info(message: string) {
  log(message, 'green');
}

function warning(message: string) {
  log(message, 'yellow');
}

// Parse PostgreSQL connection URL
function parseDbUrl(url: string) {
  try {
    const match = url.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([^?]+)/);
    if (!match) return null;
    return {
      user: match[1],
      password: match[2],
      host: match[3],
      port: match[4],
      database: match[5],
    };
  } catch {
    return null;
  }
}

// Check if command exists
function commandExists(cmd: string) {
  try {
    execSync(`which ${cmd}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Resolve the best available pg_dump/psql (prefer v17+ for Neon compatibility)
function resolvePgCmd(cmd: string): string {
  const candidates = [
    `/usr/lib/postgresql/17/bin/${cmd}`,
    `${cmd}-17`,
    cmd,
  ];
  for (const candidate of candidates) {
    try {
      execSync(`which ${candidate}`, { stdio: 'ignore' });
      return candidate;
    } catch {
      continue;
    }
  }
  return cmd;
}

// Load .env.local file
function loadEnvFile(): void {
  try {
    const envPath = resolve(process.cwd(), '.env.local');
    const content = readFileSync(envPath, 'utf-8');
    content.split('\n').forEach((line) => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0 && !line.startsWith('#')) {
        const value = valueParts.join('=').trim();
        // Remove quotes if present
        const cleanValue = value.replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = cleanValue;
        }
      }
    });
  } catch (err) {
    warning('Could not load .env.local file');
  }
}

// Parse CLI options
function parseOptions(): { skipImages: boolean; dryRun: boolean; force: boolean; url: string | null } {
  const args = process.argv.slice(2);
  const options: { skipImages: boolean; dryRun: boolean; force: boolean; url: string | null } = {
    skipImages: false,
    dryRun: false,
    force: false,
    url: null,
  };
  for (const arg of args) {
    if (arg === '--skip-images') options.skipImages = true;
    if (arg === '--dry-run') options.dryRun = true;
    if (arg === '--force') options.force = true;
    if (arg.startsWith('postgresql://') || arg.startsWith('postgres://')) {
      options.url = arg;
    }
  }
  return options;
}

// Known production/sensitive database hosts to protect
const PROTECTED_HOSTS = [
  'ep-gentle-meadow-a71g5sjs.ap-southeast-2.aws.neon.tech',
  'neon-tech',
  'neondb',
  'vercel-storage.com',
  'aws.neon.tech',
  'postgres.vercel-storage.com',
];

// Check if URL appears to be a production database
function isProductionUrl(url: string): boolean {
  if (!url) return false;
  return PROTECTED_HOSTS.some(host => url.includes(host));
}

// Check if URL is a remote image URL
function isRemoteImageUrl(url: string): boolean {
  if (!url) return false;
  return url.includes('vercel-storage.com') ||
         url.includes('cloudinary.com') ||
         url.includes('amazonaws.com') ||
         url.startsWith('http://') ||
         url.startsWith('https://');
}

// Extract filename from URL
function extractFilename(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    // Get last part of path
    const filename = pathname.split('/').pop() || '';
    // If filename has query params, remove them
    return filename.split('?')[0];
  } catch {
    return url.split('/').pop() || 'image';
  }
}

// Download image from URL
function downloadImage(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = createWriteStream(destPath);

    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        file.close();
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      reject(err);
    });
  });
}

// Get all remote image URLs from local database
function getRemoteImages(localUrl: string, psqlCmd: string): { table: string; column: string; id: string; url: string }[] {
  try {
    const sql = `
      SELECT 'Service' as table_name, 'image' as column_name, id, image as url
      FROM "Service"
      WHERE image IS NOT NULL AND image LIKE 'http%'

      UNION ALL

      SELECT 'Article' as table_name, 'imageUrl' as column_name, id, "imageUrl" as url
      FROM "Article"
      WHERE "imageUrl" IS NOT NULL AND "imageUrl" LIKE 'http%'

      UNION ALL

      SELECT 'TeamMember' as table_name, 'imageUrl' as column_name, id, "imageUrl" as url
      FROM "TeamMember"
      WHERE "imageUrl" IS NOT NULL AND "imageUrl" LIKE 'http%'
    `;
    const result = execSync(
      `${psqlCmd} -t "${localUrl}" <<'EOSQL'\n${sql}\nEOSQL`,
      { encoding: 'utf-8' }
    );

    const images: { table: string; column: string; id: string; url: string }[] = [];
    for (const line of result.trim().split('\n')) {
      const parts = line.split('|').map(p => p.trim());
      if (parts.length === 4) {
        images.push({ table: parts[0], column: parts[1], id: parts[2], url: parts[3] });
      }
    }
    return images;
  } catch {
    return [];
  }
}

// Update image URL in database
function updateImageUrl(localUrl: string, table: string, column: string, id: string, newUrl: string, dryRun = false, psqlCmd = 'psql'): boolean {
  try {
    const escapedNewUrl = newUrl.replace(/'/g, "''");
    const quotedColumn = column === 'image' ? 'image' : `"${column}"`;
    const sql = `UPDATE "${table}" SET ${quotedColumn} = '${escapedNewUrl}' WHERE id = '${id}'`;

    if (dryRun) {
      log(`  [DRY RUN] Would update: ${table}.${column} = ${newUrl}`, 'blue');
      return true;
    }

    execSync(`${psqlCmd} "${localUrl}" -c "${sql}"`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

async function main() {
  log('\n=== Database Dump & Image Sync Script ===\n', 'blue');

  // Parse options
  const options = parseOptions();

  // Load environment variables
  loadEnvFile();

  // Get remote database URL from argument or environment
  // Falls back to DATABASE_URL from .env.local.production
  if (!options.url && !process.env.REMOTE_DATABASE_URL) {
    try {
      const prodEnvPath = resolve(process.cwd(), '.env.local.production');
      const prodContent = readFileSync(prodEnvPath, 'utf-8');
      const match = prodContent.match(/^DATABASE_URL=(.+)$/m);
      if (match) {
        process.env.REMOTE_DATABASE_URL = match[1].replace(/^["']|["']$/g, '');
        info('Using DATABASE_URL from .env.local.production as remote source');
      }
    } catch {
      // .env.local.production not found — will error below
    }
  }
  const remoteUrl = options.url || process.env.REMOTE_DATABASE_URL || process.env.POSTGRES_URL;
  const localUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

  if (!remoteUrl) {
    error('Remote database URL not found!');
    log('\nPlease provide the remote database URL:', 'yellow');
    log('  1. Pass as argument: npm run db:dump:remote -- "postgresql://..."', 'yellow');
    log('  2. Set REMOTE_DATABASE_URL environment variable', 'yellow');
    process.exit(1);
  }

  if (!localUrl) {
    error('Local DATABASE_URL not found in environment!');
    process.exit(1);
  }

  // SAFETY CHECK: Prevent writing to production databases
  if (isProductionUrl(localUrl)) {
    error('⚠️  SAFETY WARNING: DATABASE_URL appears to point to a production database!');
    error(`   Detected: ${localUrl}`);
    log('\nThis script writes to DATABASE_URL. To protect your production data,', 'yellow');
    log('we refuse to continue.', 'yellow');
    log('\nTo fix this:', 'yellow');
    log('  1. Set DATABASE_URL to your LOCAL database', 'yellow');
    log('  2. Or add --force to bypass this check (not recommended)', 'yellow');
    if (!process.argv.includes('--force')) {
      process.exit(1);
    }
  }

  // Parse URLs for display
  const remoteInfo = parseDbUrl(remoteUrl);
  const localInfo = parseDbUrl(localUrl);

  info('Configuration:');
  log(`  Remote: ${remoteInfo?.host || 'unknown'}:${remoteInfo?.port || '5432'}/${remoteInfo?.database || 'unknown'}`, 'blue');
  log(`  Local:  ${localInfo?.host || 'unknown'}:${localInfo?.port || '5432'}/${localInfo?.database || 'unknown'}`, 'blue');
  if (options.skipImages) {
    log('  Images: Skipped (--skip-images)', 'yellow');
  } else if (options.dryRun) {
    log('  Mode: DRY RUN (--dry-run)', 'yellow');
  }
  log('');

  // Check for pg_dump and psql
  const pgDump = resolvePgCmd('pg_dump');
  const psql = resolvePgCmd('psql');

  if (!commandExists(pgDump)) {
    error('pg_dump is not installed!');
    log('\nInstall with:', 'yellow');
    log('  Ubuntu/Debian: sudo apt install postgresql-client', 'yellow');
    log('  macOS: brew install postgresql', 'yellow');
    process.exit(1);
  }

  if (!commandExists(psql)) {
    error('psql is not installed!');
    process.exit(1);
  }

  info(`Using pg_dump: ${pgDump}`);
  info(`Using psql: ${psql}\n`);

  // Create dump
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const dumpFile = resolve(process.cwd(), `tmp/dump_${timestamp}.sql`);

  try {
    // Create tmp directory if it doesn't exist
    execSync(`mkdir -p ${resolve(process.cwd(), 'tmp')}`, { stdio: 'ignore' });

    info('Step 1: Creating dump from remote database...');
    const dumpCmd = `${pgDump} "${remoteUrl}" --no-owner --no-acl --format=plain --verbose --file="${dumpFile}"`;
    execSync(dumpCmd, { stdio: 'inherit' });

    info(`Dump created: ${dumpFile}`);
    const stats = execSync(`du -h "${dumpFile}"`).toString().trim();
    log(`File size: ${stats}\n`, 'blue');

    // Drop existing tables before loading (clean slate)
    info('Step 2: Dropping existing tables...');
    const dropSql = `DROP TABLE IF EXISTS "Article", "Faq", "Service", "Setting", "TeamMember", _prisma_migrations CASCADE`;
    try {
      execSync(`${psql} "${localUrl}" <<'EOSQL'\n${dropSql}\nEOSQL`, { stdio: 'ignore' });
    } catch {
      // Tables may not exist yet
    }

    // Load into local database
    info('Step 3: Loading dump into local database...');
    const loadCmd = `${psql} "${localUrl}" < "${dumpFile}"`;
    execSync(loadCmd, { stdio: 'inherit' });

    info('Database loaded successfully!\n');

    // Clean up dump file
    execSync(`rm "${dumpFile}"`);
    info('Temporary dump file removed.\n');

    // Handle image localization
    if (!options.skipImages) {
      info('Step 4: Checking for remote images...');
      const remoteImages = getRemoteImages(localUrl, psql);

      if (remoteImages.length === 0) {
        info('No remote images found - all images are local!');
      } else {
        warning(`Found ${remoteImages.length} remote image(s) to download:\n`);

        // Ensure images directory exists
        const imagesDir = resolve(process.cwd(), 'public/images');
        if (!options.dryRun) {
          mkdirSync(imagesDir, { recursive: true });
        }

        let downloaded = 0;
        let skipped = 0;
        let failed = 0;

        for (const img of remoteImages) {
          const filename = extractFilename(img.url);
          const localPath = join(imagesDir, filename);
          const localImgUrl = `/images/${filename}`;

          // Check if file already exists locally
          if (existsSync(localPath)) {
            log(`  ✓ Already exists: ${filename}`, 'green');
            // Still update DB if needed (current URL != local path)
            if (img.url !== localImgUrl && img.url.endsWith(filename)) {
              updateImageUrl(localUrl, img.table, img.column, img.id, localImgUrl, options.dryRun, psql);
            }
            skipped++;
            continue;
          }

          log(`  Downloading: ${filename}`, 'blue');
          log(`    From: ${img.url}`, 'reset');

          if (options.dryRun) {
            log(`    [DRY RUN] Would save to: ${localPath}`, 'blue');
            downloaded++;
          } else {
            try {
              await downloadImage(img.url, localPath);

              // Update database to use local path
              updateImageUrl(localUrl, img.table, img.column, img.id, localImgUrl, options.dryRun, psql);

              log(`    Saved to: ${localPath}`, 'green');
              downloaded++;
            } catch (err) {
              log(`    Failed: ${err instanceof Error ? err.message : 'Unknown error'}`, 'red');
              failed++;
            }
          }
        }

        // Summary
        log('\n' + '='.repeat(50), 'blue');
        info('Image Sync Summary:');
        log(`  Downloaded: ${downloaded}`, 'green');
        log(`  Skipped:    ${skipped}`, 'yellow');
        log(`  Failed:     ${failed}`, failed > 0 ? 'red' : 'green');
        log('='.repeat(50) + '\n', 'blue');
      }
    }

    info('Done! Your local environment is now in sync.');
    log('\nNote: The Docker container uses the local database at:', 'yellow');
    log(`  ${localInfo?.host}:${localInfo?.port}/${localInfo?.database}`, 'blue');

  } catch (err) {
    error('Failed to dump/load database!');
    if (err instanceof Error) {
      log(err.message, 'red');
    }
    process.exit(1);
  }
}

main();
