const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/chava/OneDrive/Microsoft Copilot Chat Files/Documents/Desktop/BMTS_Software';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.git' && f !== '.gemini') {
        walkDir(dirPath, callback);
      }
    } else {
      callback(dirPath);
    }
  });
}

const targetExtensions = ['.js', '.ts', '.html', '.json'];
let updatedCount = 0;

walkDir(baseDir, (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if (!targetExtensions.includes(ext)) return;

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    if (content.includes('KG Sec E — Creative Progress Shown')) {
      content = content.replace(/KG Sec E — Creative Progress Shown/g, 'Sec E — Creative & Aesthetic Development: Progress Made (सर्जनशील आणि कलात्मक विकास - झालेली प्रगती)');
      changed = true;
    }

    if (content.includes('KG Sec E — Creative Challenges')) {
      content = content.replace(/KG Sec E — Creative Challenges/g, 'Sec E — Creative & Aesthetic Development: Progress Needed (सर्जनशील आणि कलात्मक विकास - आवश्यक प्रगती)');
      changed = true;
    }

    if (content.includes('Creative & Aesthetic (सर्जनशील आणि सौंदर्य)')) {
      content = content.replace(/Creative & Aesthetic \(सर्जनशील आणि सौंदर्य\)/g, 'Creative and Aesthetic Development (सर्जनशील आणि कलात्मक विकास)');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated:', filePath);
      updatedCount++;
    }
  } catch (err) {}
});

console.log(`Total files updated for Creative Development: ${updatedCount}`);
