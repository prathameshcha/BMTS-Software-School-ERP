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

    if (content.includes('KG Sec B — Social Emotional Progress Shown')) {
      content = content.replace(/KG Sec B — Social Emotional Progress Shown/g, 'Sec B — Socio-Emotional Development: Progress Made (सामाजिक व भावनिक विकास - झालेली प्रगती)');
      changed = true;
    }

    if (content.includes('KG Sec B — Social Emotional Challenges')) {
      content = content.replace(/KG Sec B — Social Emotional Challenges/g, 'Sec B — Socio-Emotional Development: Progress Needed (सामाजिक व भावनिक विकास - आवश्यक प्रगती)');
      changed = true;
    }

    if (content.includes('B. Socio-Emotional & Ethical (सामाजिक-भावनिक आणि नैतिक)')) {
      content = content.replace(/B\. Socio-Emotional & Ethical \(सामाजिक-भावनिक आणि नैतिक\)/g, 'B. Socio-Emotional Development (सामाजिक व भावनिक विकास)');
      changed = true;
    }

    if (content.includes('B. Social Emotional Development :')) {
      content = content.replace(/B\. Social Emotional Development :/g, 'B. Socio-Emotional Development :');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated:', filePath);
      updatedCount++;
    }
  } catch (err) {}
});

console.log(`Total files updated for Socio-Emotional: ${updatedCount}`);
