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

    if (content.includes('Physical & Motor Development')) {
      content = content.replace(/Physical & Motor Development/g, 'Physical Development');
      changed = true;
    }

    if (content.includes('Physical and Motor Development')) {
      content = content.replace(/Physical and Motor Development/g, 'Physical Development');
      changed = true;
    }

    if (content.includes('शारीरिक आणि मोटर विकास')) {
      content = content.replace(/शारीरिक आणि मोटर विकास/g, 'शारीरिक विकास');
      changed = true;
    }

    if (content.includes('शारीरिक आणि कारक विकास')) {
      content = content.replace(/शारीरिक आणि कारक विकास/g, 'शारीरिक विकास');
      changed = true;
    }

    if (content.includes('KG Sec A — Physical Progress Shown')) {
      content = content.replace(/KG Sec A — Physical Progress Shown/g, 'Sec A — Physical Development: Progress Made (शारीरिक विकास - झालेली प्रगती)');
      changed = true;
    }

    if (content.includes('KG Sec A — Physical Challenges to Face')) {
      content = content.replace(/KG Sec A — Physical Challenges to Face/g, 'Sec A — Physical Development: Progress Needed (शारीरिक विकास - आवश्यक प्रगती)');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated:', filePath);
      updatedCount++;
    }
  } catch (err) {
    // Ignore read errors
  }
});

console.log(`Total files updated: ${updatedCount}`);
