import fs from 'fs'
import path from 'path'

const root = 'public'
const MAX = 350 * 1024 // 350KB
const exts = /\.(png|jpe?g|webp|avif)$/i
const skip = /\/images\/tools\// // ignore icons

const walk = d => fs.readdirSync(d).flatMap(f => {
  const p = path.join(d, f)
  return fs.statSync(p).isDirectory() ? walk(p) : [p]
})

console.log('🔍 Checking image sizes...')

let bad = 0
let total = 0

for (const f of walk(root)) {
  if (!exts.test(f) || skip.test(f)) continue
  
  total++
  const size = fs.statSync(f).size
  const sizeKB = Math.round(size / 1024)
  
  if (size > MAX) {
    console.log(`❌ Large: ${f.replace('public/', '')} (${sizeKB}KB > 350KB)`)
    bad++
  } else {
    console.log(`✅ OK: ${f.replace('public/', '')} (${sizeKB}KB)`)
  }
}

console.log(`\n📊 Summary: ${total - bad}/${total} images under 350KB limit`)

if (bad > 0) {
  console.log(`\n🚨 ${bad} oversized images found. Run 'npm run img:opt' to optimize them.`)
  process.exit(1)
} else {
  console.log('\n🎉 All images are within size limits!')
  process.exit(0)
}