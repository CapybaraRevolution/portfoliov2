import fs from 'fs'
import path from 'path'

const root = 'public'
const MAX = 350 * 1024 // 350KB for optimized formats
const MAX_HERO = 600 * 1024 // 600KB for hero AVIF/WebP
const exts = /\.(png|jpe?g|webp|avif)$/i
const skip = /\/images\/tools\// // ignore icons

const walk = d => fs.readdirSync(d).flatMap(f => {
  const p = path.join(d, f)
  return fs.statSync(p).isDirectory() ? walk(p) : [p]
})

const hasOptimizedSibling = (file) => {
  const base = file.replace(/\.(png|jpe?g)$/i, '')
  return fs.existsSync(base + '.webp') || fs.existsSync(base + '.avif')
}

console.log('🔍 Checking image sizes...')

let bad = 0
let total = 0

for (const f of walk(root)) {
  if (!exts.test(f) || skip.test(f)) continue
  
  // Skip source PNG/JPG files if optimized versions exist
  const isSource = /\.(png|jpe?g)$/i.test(f) && hasOptimizedSibling(f)
  if (isSource) {
    console.log(`⏭️  Skipping: ${f.replace('public/', '')} (source file, optimized versions exist)`)
    continue
  }
  
  total++
  const size = fs.statSync(f).size
  const sizeKB = Math.round(size / 1024)
  
  // Use higher limit for AVIF/WebP hero images
  const isOptimized = /\.(webp|avif)$/i.test(f)
  const limit = isOptimized ? MAX_HERO : MAX
  const limitKB = Math.round(limit / 1024)
  
  if (size > limit) {
    console.log(`❌ Large: ${f.replace('public/', '')} (${sizeKB}KB > ${limitKB}KB)`)
    bad++
  } else {
    console.log(`✅ OK: ${f.replace('public/', '')} (${sizeKB}KB)`)
  }
}

console.log(`\n📊 Summary: ${total - bad}/${total} images under size limits (350KB standard, 600KB optimized)`)

if (bad > 0) {
  console.log(`\n🚨 ${bad} oversized images found. Run 'npm run img:opt' to optimize them.`)
  process.exit(1)
} else {
  console.log('\n🎉 All images are within size limits!')
  process.exit(0)
}