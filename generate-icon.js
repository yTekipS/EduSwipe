import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generuj logo-full.png z assets/2.png
sharp(path.join(__dirname, 'assets', '2.png'))
  .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png()
  .toFile(path.join(__dirname, 'public', 'logo-full.png'), (err, info) => {
    if (err) {
      console.error('Błąd generowania logo-full:', err);
      process.exit(1);
    }
    console.log('✅ logo-full.png wygenerowany z assets/2.png (512x512)');
  });

// Generuj logo-min.png z assets/1.png
sharp(path.join(__dirname, 'assets', '1.png'))
  .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png()
  .toFile(path.join(__dirname, 'public', 'logo-min.png'), (err, info) => {
    if (err) {
      console.error('Błąd generowania logo-min:', err);
      process.exit(1);
    }
    console.log('✅ logo-min.png wygenerowany z assets/1.png (192x192)');
  });
