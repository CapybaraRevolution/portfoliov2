import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const root = 'public/images'
const MAX_W = 2880  // Increased from 1920 for better Retina support

const walk = (d) => fs.readdirSync(d).flatMap(f => {
  const p = path.join(d, f)
  return fs.statSync(p).isDirectory() ? walk(p) : [p]
})

console.log('🖼️  Optimizing images...')

for (const f of walk(root)) {
  if (!/\.(jpe?g|png)$/i.test(f)) continue
  
  const stats = fs.statSync(f)
  const sizeMB = (stats.size / 1024 / 1024).toFixed(1)
  
  console.log(`Processing: ${path.basename(f)} (${sizeMB}MB)`)
  
  const outWebp = f.replace(/\.(jpe?g|png)$/i, '.webp')
  const outAvif = f.replace(/\.(jpe?g|png)$/i, '.avif')
  
  try {
    // Generate WebP version with adaptive quality based on source size
    const webpQuality = stats.size > 500 * 1024 ? 85 : 90  // 85% for files over 500KB, 90% for smaller
    await sharp(f)
      .resize({ width: MAX_W, withoutEnlargement: true })
      .webp({ 
        quality: webpQuality,  // Adaptive quality for size optimization
        effort: 6,             // Better compression algorithm
        smartSubsample: false  // Preserve detail
      })
      .toFile(outWebp)
    
    // Generate AVIF version with optimized quality
    await sharp(f)
      .resize({ width: MAX_W, withoutEnlargement: true })
      .avif({ 
        quality: 70,           // 70 is plenty crisp, smaller than 75
        effort: 6              // Better compression
      })
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