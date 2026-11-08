#!/usr/bin/env node
/**
 * Guard against running database write commands against production.
 *
 * Wired into package.json before db:push / db:seed / db:seed:page.
 * Blocks the command when the effective DATABASE_URL points at a Neon
 * host (this project's production database) unless the operator
 * explicitly opts in with ALLOW_PROD_DB=1.
 *
 * URL resolution mirrors Prisma: real environment variable first, then
 * the .env file (Prisma CLI ignores .env.local — that's Next.js only).
 */
const fs = require("fs");
const path = require("path");

function resolveUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  try {
    const env = fs.readFileSync(path.join(__dirname, "..", ".env"), "utf8");
    const m = env.match(/^\s*DATABASE_URL\s*=\s*(.+)$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  } catch {
    /* no .env file */
  }
  return null;
}

const url = resolveUrl();

if (url && /neon\.tech/i.test(url) && process.env.ALLOW_PROD_DB !== "1") {
  console.error("");
  console.error("  ⛔  BLOCKED: DATABASE_URL points at a Neon (production) database.");
  console.error("");
  console.error("  Database seeds/writes only ever run against production when");
  console.error("  explicitly requested. If that is genuinely what you want right");
  console.error("  now, re-run the same command with the opt-in flag:");
  console.error("");
  console.error("      ALLOW_PROD_DB=1 npm run <script>");
  console.error("");
  process.exit(1);
}

if (!url) {
  console.error("");
  console.error("  ⚠️  No DATABASE_URL found. (The production URL in .env is kept");
  console.error("     commented out on purpose — see the warning in that file.)");
  console.error("");
  console.error("  For the local Docker database, prefix the command:");
  console.error("");
  console.error('      DATABASE_URL="postgresql://postgres:verify@localhost:5433/postgres" npm run <script>');
  console.error("");
  process.exit(1);
}

// Local (or explicitly allowed) database — proceed.
const host = url.replace(/^[^@]*@/, "").split("/")[0];
console.log(`  🛡  db-guard: proceeding against ${host}`);
