import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [
  { name: 'mdpi', size: 48 },
  { name: 'hdpi', size: 72 },
  { name: 'xhdpi', size: 96 },
  { name: 'xxhdpi', size: 144 },
  { name: 'xxxhdpi', size: 192 }
];

async function generateAndroidIcons() {
  try {
    for (const { name, size } of sizes) {
      const outputDir = path.join(__dirname, 'android', 'app', 'src', 'main', 'res', `mipmap-${name}`);
      const outputPath = path.join(outputDir, 'ic_launcher.png');

      await sharp(path.join(__dirname, 'assets', '1.png'))
        .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .png()
        .toFile(outputPath);

      console.log(`✅ Wygenerowano: mipmap-${name}/ic_launcher.png (${size}x${size})`);
    }
    console.log('\n✅ Wszystkie ikony Android wygenerowane pomyślnie!');
  } catch (err) {
    console.error('Błąd generowania ikon Android:', err);
    process.exit(1);
  }
}

generateAndroidIcons();
