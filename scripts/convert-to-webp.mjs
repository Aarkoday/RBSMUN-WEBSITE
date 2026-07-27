/**
 * RBSMUN — PNG → WebP Batch Converter
 * ─────────────────────────────────────────────────────────────────────
 * Usage:  node scripts/convert-to-webp.mjs
 *
 * What it does:
 *   1. Finds every .png file inside /public
 *   2. Converts it to .webp (same folder, same base name, better compression)
 *   3. Deletes the original .png
 *   4. Updates every reference to ".png" → ".webp" across all source files
 *      (src/, *.astro, *.css, *.jsx, *.tsx, *.js, *.ts, *.md, *.json)
 *
 * Requirements:  sharp  (installed automatically on first run)
 *   Run once manually if needed:  npm install --save-dev sharp
 */

import { createRequire } from 'module';
import { readdir, readFile, writeFile, unlink, stat } from 'fs/promises';
import { resolve, relative, join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ── CONFIG ────────────────────────────────────────────────────────────────────
const IMAGE_DIR   = join(ROOT, 'public');         // Where to scan for PNGs
const SOURCE_DIRS = [                              // Where to update references
  join(ROOT, 'src'),
  ROOT,                                            // catches astro.config.mjs etc.
];
const SOURCE_EXTS = new Set([
  '.astro', '.jsx', '.tsx', '.js', '.ts',
  '.css', '.md', '.json', '.html',
]);
const WEBP_QUALITY = 85;   // 0-100  (85 is a good balance of size vs quality)
// ─────────────────────────────────────────────────────────────────────────────

async function ensureSharp() {
  try {
    const req = createRequire(import.meta.url);
    return req('sharp');
  } catch {
    console.log('📦  sharp not found — installing...');
    const { execSync } = await import('child_process');
    execSync('npm install --save-dev sharp', { stdio: 'inherit', cwd: ROOT });
    const req = createRequire(import.meta.url);
    return req('sharp');
  }
}

async function findFiles(dir, predicate, results = []) {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); }
  catch { return results; }

  for (const e of entries) {
    // Skip build artifacts and third-party code
    if (e.isDirectory() && (e.name === 'node_modules' || e.name === 'dist' || e.name === '.git')) continue;

    const full = join(dir, e.name);
    if (e.isDirectory()) {
      await findFiles(full, predicate, results);
    } else if (predicate(e.name)) {
      results.push(full);
    }
  }
  return results;
}

async function convertImages(sharp) {
  const images = await findFiles(
    IMAGE_DIR,
    n => /\.(png|jpe?g)$/i.test(n)
  );

  if (images.length === 0) {
    console.log('✅  No .png/.jpg files found in /public — nothing to convert.');
    return [];
  }

  console.log(`\n🖼️  Found ${images.length} image(s) to convert:\n`);

  const converted = [];

  for (const src of images) {
    const rel  = relative(ROOT, src);
    const dest = src.replace(/\.(png|jpe?g)$/i, '.webp');
    const destRel = relative(ROOT, dest);

    try {
      const before = (await stat(src)).size;
      const fileBuffer = await readFile(src);
      
      const image = sharp(fileBuffer).rotate();
      await image.webp({ quality: WEBP_QUALITY }).toFile(dest);
      
      image.destroy?.(); // Release resource locks on Windows
      
      const after = (await stat(dest)).size;
      const saving = (((before - after) / before) * 100).toFixed(1);

      await unlink(src); // delete original

      console.log(`  ✓ ${rel}`);
      console.log(`    → ${destRel}  (${(before/1024).toFixed(0)} KB → ${(after/1024).toFixed(0)} KB, −${saving}%)\n`);

      converted.push({
        oldName: basename(src),
        newName: basename(dest),
      });
    } catch (err) {
      console.error(`  ✗ Failed: ${rel} — ${err.message}`);
    }
  }

  return converted;
}

async function updateReferences(converted) {
  if (converted.length === 0) return;

  const renames = converted.map(c => ({ from: c.oldName, to: c.newName }));

  const sourceFiles = [];
  for (const dir of SOURCE_DIRS) {
    await findFiles(
      dir,
      name => SOURCE_EXTS.has(extname(name).toLowerCase()),
      sourceFiles,
    );
  }

  console.log(`\n🔍  Scanning ${sourceFiles.length} source file(s) for references...\n`);

  let totalChanges = 0;

  for (const file of sourceFiles) {
    let content;
    try { content = await readFile(file, 'utf8'); }
    catch { continue; }

    let updated = content;
    for (const { from, to } of renames) {
      const escaped = from.replace(/\./g, '\\.');
      const re = new RegExp(escaped, 'g');
      updated = updated.replace(re, to);
    }

    if (updated !== content) {
      await writeFile(file, updated, 'utf8');
      const rel = relative(ROOT, file);
      console.log(`  ✏️  Updated: ${rel}`);
      totalChanges++;
    }
  }

  if (totalChanges === 0) {
    console.log('  ℹ️  No source file references needed updating.');
  }
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
(async () => {
  console.log('='.repeat(60));
  console.log('  RBSMUN — PNG + JPG to WebP Batch Converter');
  console.log('='.repeat(60));

  const sharp = await ensureSharp();
  const converted = await convertImages(sharp);
  await updateReferences(converted);

  console.log('\n' + '='.repeat(60));
  if (converted.length > 0) {
    console.log(`  Done! Converted ${converted.length} file(s) to WebP.`);
    console.log('  All source references updated automatically.');
  } else {
    console.log('  Nothing to do.');
  }
  console.log('='.repeat(60) + '\n');
})();
