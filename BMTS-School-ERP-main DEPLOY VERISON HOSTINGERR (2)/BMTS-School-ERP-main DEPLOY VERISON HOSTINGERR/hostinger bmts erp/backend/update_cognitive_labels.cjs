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

    if (content.includes('KG Sec C — Cognitive Progress Shown')) {
      content = content.replace(/KG Sec C — Cognitive Progress Shown/g, 'Sec C — Cognitive Development: Progress Made (संज्ञानात्मक विकास - झालेली प्रगती)');
      changed = true;
    }

    if (content.includes('KG Sec C — Cognitive Challenges')) {
      content = content.replace(/KG Sec C — Cognitive Challenges/g, 'Sec C — Cognitive Development: Progress Needed (संज्ञानात्मक विकास - आवश्यक प्रगती)');
      changed = true;
    }

    if (content.includes('C. Cognitive Development (संज्ञानात्मक विकास)')) {
      // already good
    } else if (content.includes('C. Cognitive Development')) {
      // make sure it has (संज्ञानात्मक विकास)
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated:', filePath);
      updatedCount++;
    }
  } catch (err) {}
});

console.log(`Total files updated for Cognitive Development: ${updatedCount}`);
