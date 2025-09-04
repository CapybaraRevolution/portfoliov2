import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const root = 'public/images/case-studies'

const walk = (d) => fs.readdirSync(d).flatMap(f => {
  const p = path.join(d, f)
  return fs.statSync(p).isDirectory() ? walk(p) : [p]
})

console.log('🖼️  Optimizing case study images...')

for (const f of walk(root)) {
  if (!/\.(jpe?g|png)$/i.test(f)) continue
  
  const stats = fs.statSync(f)
  const sizeMB = (stats.size / 1024 / 1024).toFixed(1)
  
  console.log(`Processing: ${path.basename(f)} (${sizeMB}MB)`)
  
  const outWebp = f.replace(/\.(jpe?g|png)$/i, '.webp')
  const outAvif = f.replace(/\.(jpe?g|png)$/i, '.avif')
  
  try {
    // Generate WebP version
    await sharp(f)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(outWebp)
    
    // Generate AVIF version  
    await sharp(f)
      .resize({ width: 1920, withoutEnlargement: true })
      .avif({ quality: 48 })
      .toFile(outAvif)
    
    const webpStats = fs.statSync(outWebp)
    const avifStats = fs.statSync(outAvif)
    
    console.log(`  ✅ WebP: ${(webpStats.size / 1024).toFixed(0)}KB`)
    console.log(`  ✅ AVIF: ${(avifStats.size / 1024).toFixed(0)}KB`)
    
  } catch (error) {
    console.error(`  ❌ Error processing ${f}:`, error.message)
  }
}

console.log('🎉 Image optimization complete!')