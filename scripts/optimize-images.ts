import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname } from "path";

const IMAGES_DIR = join(process.cwd(), "public", "images");
const MAX_DIMENSION = 1920;
const WEBP_QUALITY = 80;
const JPEG_QUALITY = 80;
const SIZE_THRESHOLD = 200_000; // 200 KB — skip files smaller than this

// Files to skip (UI assets, logos, icons)
const SKIP_NAMES = new Set(["icon.png", "logo-side.png", "logo-under.png"]);

interface Result {
  file: string;
  before: string;
  after: string;
  saved: string;
  action: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function processFile(filePath: string): Promise<Result | null> {
  const fileName = filePath.split("/").pop()!;
  const ext = extname(filePath).toLowerCase();
  const fileStat = await stat(filePath);
  const beforeSize = fileStat.size;

  if (beforeSize < SIZE_THRESHOLD) return null;
  if (SKIP_NAMES.has(fileName)) return null;

  const image = sharp(filePath);
  const metadata = await image.metadata();
  const hasAlpha = metadata.hasAlpha ?? false;
  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;

  // Determine if resizing is needed
  const needsResize = width > MAX_DIMENSION || height > MAX_DIMENSION;

  if (ext === ".png") {
    // PNG photographs → WebP
    // Small PNGs with alpha or UI assets are skipped above
    const outPath = filePath.replace(/\.png$/i, ".webp");
    let pipeline = sharp(filePath);
    if (needsResize) {
      pipeline = pipeline.resize(MAX_DIMENSION, MAX_DIMENSION, {
        fit: "inside",
        withoutEnlargement: true,
      });
    }
    await pipeline.webp({ quality: WEBP_QUALITY }).toFile(outPath);
    const afterSize = (await stat(outPath)).size;
    return {
      file: fileName,
      before: formatBytes(beforeSize),
      after: formatBytes(afterSize),
      saved: formatBytes(beforeSize - afterSize),
      action: "PNG → WebP" + (needsResize ? ` (resized ${width}x${height})` : ""),
    };
  }

  if (ext === ".jpg" || ext === ".jpeg") {
    let pipeline = sharp(filePath);
    if (needsResize) {
      pipeline = pipeline.resize(MAX_DIMENSION, MAX_DIMENSION, {
        fit: "inside",
        withoutEnlargement: true,
      });
    }
    await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toFile(filePath + ".tmp");
    const { rename } = await import("fs/promises");
    await rename(filePath + ".tmp", filePath);
    const afterSize = (await stat(filePath)).size;
    return {
      file: fileName,
      before: formatBytes(beforeSize),
      after: formatBytes(afterSize),
      saved: formatBytes(beforeSize - afterSize),
      action: "JPEG re-encoded" + (needsResize ? ` (resized ${width}x${height})` : ""),
    };
  }

  return null;
}

async function main() {
  console.log(`Scanning ${IMAGES_DIR}...\n`);

  const entries = await readdir(IMAGES_DIR, { recursive: true });
  const results: Result[] = [];

  for (const entry of entries) {
    const filePath = join(IMAGES_DIR, entry as string);
    const s = await stat(filePath);
    if (!s.isFile()) continue;
    const ext = extname(filePath).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

    try {
      const result = await processFile(filePath);
      if (result) results.push(result);
    } catch (err) {
      console.error(`Error processing ${entry}: ${err}`);
    }
  }

  console.log("Results:\n");
  for (const r of results) {
    console.log(`  ${r.file}: ${r.before} → ${r.after} (saved ${r.saved}) [${r.action}]`);
  }

  const totalSaved = results.reduce((sum, r) => {
    const parseBytes = (s: string) => {
      if (s.endsWith(" MB")) return parseFloat(s) * 1024 * 1024;
      if (s.endsWith(" KB")) return parseFloat(s) * 1024;
      return parseFloat(s);
    };
    return sum + parseBytes(r.saved);
  }, 0);
  console.log(`\nTotal saved: ${formatBytes(totalSaved)} across ${results.length} files`);

  if (results.some((r) => r.action.includes("WebP"))) {
    console.log("\n⚠️  Some PNGs were converted to WebP — update code references from .png to .webp");
  }
}

main().catch(console.error);
