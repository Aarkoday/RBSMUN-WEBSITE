/**
 * RBSMUN — WebP Optimizer
 * ─────────────────────────────────────────────────────────────────────
 * Usage:  node scripts/optimize-webp.mjs
 *
 * What it does:
 *   1. Recursively finds every .webp file inside /public/images
 *   2. If a file is larger than 500KB:
 *      - Resizes it down to maximum dimensions of 1600px (width or height)
 *      - Re-compresses it to quality 80
 *      - Overwrites the file in place if size reduction is achieved
 */

import { readdir, stat, writeFile, readFile } from 'fs/promises';
import { resolve, dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const IMAGE_DIR = join(ROOT, 'public', 'images');
const SIZE_THRESHOLD_KB = 500; // Only target files larger than 500KB
const MAX_DIMENSION = 1600; // Limit dimension to 1600px max (perfect for screens)
const WEBP_QUALITY = 80;

const require = createRequire(import.meta.url);
const sharp = require('sharp');

async function findFiles(dir, predicate, results = []) {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); }
  catch { return results; }

  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      await findFiles(full, predicate, results);
    } else if (predicate(e.name)) {
      results.push(full);
    }
  }
  return results;
}

(async () => {
  console.log('='.repeat(60));
  console.log('  RBSMUN — WebP High-Resolution Optimization');
  console.log('='.repeat(60));

  const files = await findFiles(IMAGE_DIR, n => n.toLowerCase().endsWith('.webp'));
  let totalOptimized = 0;
  let totalSavedBytes = 0;

  for (const file of files) {
    const rel = relative(ROOT, file);
    try {
      const stats = await stat(file);
      const sizeKB = stats.size / 1024;

      if (sizeKB > SIZE_THRESHOLD_KB) {
        console.log(`⚡  Optimizing large image: ${rel} (${sizeKB.toFixed(0)} KB)`);
        
        // Read file into memory buffer first to completely avoid file locks
        const fileBuffer = await readFile(file);
        
        // Read metadata from memory buffer
        const image = sharp(fileBuffer);
        const metadata = await image.metadata();

        let pipeline = sharp(fileBuffer).rotate();
        
        // Resize down to 1600px max keeping aspect ratio if larger
        if ((metadata.width && metadata.width > MAX_DIMENSION) || (metadata.height && metadata.height > MAX_DIMENSION)) {
          pipeline = pipeline.resize({
            width: metadata.width > metadata.height ? MAX_DIMENSION : null,
            height: metadata.height >= metadata.width ? MAX_DIMENSION : null,
            fit: 'inside',
            withoutEnlargement: true
          });
        }

        // Compress
        const buffer = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
        
        // Explicitly close/destroy sharp handles to release the file lock
        image.destroy?.();
        pipeline.destroy?.();
        
        if (buffer.length < stats.size) {
          const saving = (((stats.size - buffer.length) / stats.size) * 100).toFixed(1);
          const savedKB = (stats.size - buffer.length) / 1024;
          
          // Write back in-place safely using fs/promises writeFile
          await writeFile(file, buffer);
          
          console.log(`    → Optimized: ${(buffer.length/1024).toFixed(0)} KB (Saved: ${savedKB.toFixed(0)} KB, −${saving}%)\n`);
          totalOptimized++;
          totalSavedBytes += (stats.size - buffer.length);
        } else {
          console.log(`    → Already highly optimized. Skipping rewrite.\n`);
        }
      }
    } catch (err) {
      console.error(`  ✗ Failed to optimize ${rel}: ${err.message}`);
    }
  }

  console.log('='.repeat(60));
  console.log(`  Done! Optimized ${totalOptimized} file(s).`);
  console.log(`  Total space saved: ${(totalSavedBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log('='.repeat(60) + '\n');
})();
