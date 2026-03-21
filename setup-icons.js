import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupIconsFromAsset() {
  try {
    const sourceImage = path.join(__dirname, 'assets', '1.png');

    // Android ikony - skaluj 1.png do odpowiednich rozmiarów
    const androidSizes = [
      { name: 'mdpi', size: 48 },
      { name: 'hdpi', size: 72 },
      { name: 'xhdpi', size: 96 },
      { name: 'xxhdpi', size: 144 },
      { name: 'xxxhdpi', size: 192 }
    ];

    for (const { name, size } of androidSizes) {
      // ic_launcher.png
      const launcherPath = path.join(__dirname, 'android', 'app', 'src', 'main', 'res', `mipmap-${name}`, 'ic_launcher.png');
      await sharp(sourceImage)
        .resize(size, size, { fit: 'cover' })
        .png()
        .toFile(launcherPath);

      // ic_launcher_round.png
      const roundPath = path.join(__dirname, 'android', 'app', 'src', 'main', 'res', `mipmap-${name}`, 'ic_launcher_round.png');
      await sharp(sourceImage)
        .resize(size, size, { fit: 'cover' })
        .png()
        .toFile(roundPath);

      // ic_launcher_foreground.png (dla adaptive icon)
      const foregroundPath = path.join(__dirname, 'android', 'app', 'src', 'main', 'res', `mipmap-${name}`, 'ic_launcher_foreground.png');
      await sharp(sourceImage)
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(foregroundPath);

      console.log(`✅ mipmap-${name} (${size}x${size}) - launcher, round, foreground`);
    }

    console.log('\n✅ Wszystkie ikony wygenerowane z assets/1.png!');
  } catch (err) {
    console.error('Błąd:', err);
    process.exit(1);
  }
}

setupIconsFromAsset();
