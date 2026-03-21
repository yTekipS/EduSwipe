import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SVG czapki akademickiej (mortarboard - edukacja)
const morningboardSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#ffffff"/>
  
  <!-- Czapka akademicka -->
  <g transform="translate(256, 256)">
    <!-- Dach (górny kwadrat) -->
    <path d="M -120 -80 L 0 -150 L 120 -80 L 0 20 Z" fill="#000000" stroke="none"/>
    
    <!-- Przedni panel -->
    <path d="M -120 -80 L -120 40 L 120 40 L 120 -80 Z" fill="#1a1a1a" stroke="none"/>
    
    <!-- Kolejny warstwa (depth) -->
    <path d="M -100 -60 L -100 60 L 100 60 L 100 -60 Z" fill="#333333" stroke="none" opacity="0.7"/>
    
    <!-- Taśma (czarna taśma wokół czapki) -->
    <ellipse cx="0" cy="40" rx="125" ry="35" fill="#000000" stroke="none"/>
    
    <!-- Fioletowa taśma (indigo) -->
    <ellipse cx="0" cy="35" rx="120" ry="30" fill="#6366f1" stroke="none"/>
    
    <!-- Pęk (hanging element) -->
    <line x1="0" y1="40" x2="0" y2="100" stroke="#6366f1" stroke-width="8" stroke-linecap="round"/>
    <circle cx="0" cy="115" r="12" fill="#6366f1"/>
  </g>
</svg>
`;

// Generuj PWA ikony z SVG
async function generateIcons() {
  try {
    // logo-min.png (192x192)
    await sharp(Buffer.from(morningboardSvg))
      .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(__dirname, 'public', 'logo-min.png'));
    console.log('✅ PWA logo-min.png (192x192) wygenerowany');

    // logo-full.png (512x512)
    await sharp(Buffer.from(morningboardSvg))
      .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(__dirname, 'public', 'logo-full.png'));
    console.log('✅ PWA logo-full.png (512x512) wygenerowany');

    // Android ikony
    const androidSizes = [
      { name: 'mdpi', size: 48 },
      { name: 'hdpi', size: 72 },
      { name: 'xhdpi', size: 96 },
      { name: 'xxhdpi', size: 144 },
      { name: 'xxxhdpi', size: 192 }
    ];

    for (const { name, size } of androidSizes) {
      const outputPath = path.join(__dirname, 'android', 'app', 'src', 'main', 'res', `mipmap-${name}`, 'ic_launcher.png');
      await sharp(Buffer.from(morningboardSvg))
        .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .png()
        .toFile(outputPath);
      console.log(`✅ Android mipmap-${name}/ic_launcher.png (${size}x${size})`);
    }

    console.log('\n✅ Wszystkie ikony czapki akademickiej wygenerowane!');
  } catch (err) {
    console.error('Błąd:', err);
    process.exit(1);
  }
}

generateIcons();
