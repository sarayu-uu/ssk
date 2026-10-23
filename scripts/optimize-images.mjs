// Creates a .webp next to every .jpg/.jpeg/.png in public/images.
// Usage: npm i -D sharp && node scripts/optimize-images.mjs
import { readdir, stat } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = fileURLToPath(new URL('../public/images', import.meta.url))
const QUALITY = 80

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else yield path
  }
}

const newer = async (a, b) => {
  try {
    return (await stat(a)).mtimeMs >= (await stat(b)).mtimeMs
  } catch {
    return false
  }
}

let made = 0
let skipped = 0
for await (const file of walk(root)) {
  if (!['.jpg', '.jpeg', '.png'].includes(extname(file).toLowerCase())) continue
  const out = file.replace(/\.(jpe?g|png)$/i, '.webp')
  if (await newer(out, file)) {
    skipped++
    continue
  }
  await sharp(file).webp({ quality: QUALITY }).toFile(out)
  made++
  console.log('webp', out.slice(root.length + 1))
}
console.log(`Done: ${made} created, ${skipped} up to date.`)
