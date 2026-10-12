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

    if (content.includes('KG Sec D — Language Progress Shown')) {
      content = content.replace(/KG Sec D — Language Progress Shown/g, 'Sec D — Language & Literacy Development: Progress Made (भाषा आणि साक्षरता विकास - झालेली प्रगती)');
      changed = true;
    }

    if (content.includes('KG Sec D — Language Challenges')) {
      content = content.replace(/KG Sec D — Language Challenges/g, 'Sec D — Language & Literacy Development: Progress Needed (भाषा आणि साक्षरता विकास - आवश्यक प्रगती)');
      changed = true;
    }

    if (content.includes('Language & Literacy Development (भाषा आणि साक्षरता विकास)')) {
      // already updated
    } else if (content.includes('Language & Literacy (भाषा आणि साक्षरता)')) {
      content = content.replace(/Language & Literacy \(भाषा आणि साक्षरता\)/g, 'Language and Literacy Development (भाषा आणि साक्षरता विकास)');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated:', filePath);
      updatedCount++;
    }
  } catch (err) {}
});

console.log(`Total files updated for Language Development: ${updatedCount}`);
