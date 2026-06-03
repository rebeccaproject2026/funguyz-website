const sharp = require('sharp');
const fs = require('fs');

function makeTransparent1024x1024() {
  const srcPath = 'C:\\Users\\Naveen\\.gemini\\antigravity\\brain\\7fafd5e6-61a7-4148-ad95-5a8d92167261\\hero_composition_clean_white_1780193532411.png';
  const destPath = 'public/images/hero_composition.png';

  console.log('Loading full 1024x1024 image for uncropped transparency conversion...');
  if (!fs.existsSync(srcPath)) {
    console.error('Error: Source file does not exist at:', srcPath);
    return;
  }

  sharp(srcPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => {
      console.log(`Image decoded successfully. Resolution: ${info.width}x${info.height}`);
      const { width, height, channels } = info;
      
      let transparentCount = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (width * y + x) * channels;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          
          // Position-based threshold mapping:
          let threshold = 238;
          
          // Bottom area: Extremely aggressive to strip the floor shadow smudge
          if (y > height - 144) {
            threshold = 195;
          } 
          // Outer horizontal borders (edges)
          else if (x < 64 || x > width - 64) {
            threshold = 215;
          }
          // Top area
          else if (y < 64) {
            threshold = 215;
          }
          
          // Key out background pixels exceeding the local threshold
          if (r > threshold && g > threshold && b > threshold) {
            const maxVal = Math.max(r, g, b);
            const diff = 255 - maxVal;
            
            if (diff < 6) {
              data[idx + 3] = 0; // 100% transparent
            } else {
              // Smooth gradient edge anti-aliasing
              const ratio = diff / 18;
              data[idx + 3] = Math.min(255, Math.floor(ratio * 255));
            }
            transparentCount++;
          }
        }
      }
      
      console.log(`Keyed out ${transparentCount} background and shadow pixels. Saving full-size transparent PNG...`);
      
      sharp(data, {
        raw: {
          width,
          height,
          channels
        }
      })
      .png()
      .toFile(destPath)
      .then(() => {
        console.log('Success! Full 1024x1024 uncropped transparent PNG successfully written!');
      })
      .catch((err) => {
        console.error('Error writing file with sharp:', err);
      });
    })
    .catch((err) => {
      console.error('Error decoding image with sharp:', err);
    });
}

makeTransparent1024x1024();
