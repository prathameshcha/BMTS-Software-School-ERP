const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'backend', 'dist', 'routes', 'pdf.routes.js'),
  path.join(__dirname, '..', 'deploy_ready', 'backend', 'dist', 'routes', 'pdf.routes.js')
];

for (const filePath of files) {
  if (!fs.existsSync(filePath)) {
    console.log('Skipping non-existent file:', filePath);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Disable 3-panel landscape brochure for 8th/9th/10th so all classes get the standard 2-page report card
  content = content.replace(
    /const isSecondary = \/\^\(8\|8th\|viii\|9\|9th\|ix\|10\|10th\|x\)\$\/i\.test\(reportCard\.class\.name\);/,
    'const isSecondary = false;'
  );

  // 2. Set isKG = true so all classes get Sections A-E, F, G, H
  content = content.replace(
    /const isKG = \/\^\(jr\|sr\|junior\|senior\|kg\)\/i\.test\(reportCard\.class\.name\);/,
    'const isKG = true;'
  );

  // 3. Fix unescaped \\${schoolNameHeader} -> ${schoolNameHeader}
  content = content.replace('\\${schoolNameHeader}', '${schoolNameHeader}');

  // 4. Ensure isFoundationSchool is correct: Pre-primary/1st/2nd -> Foundation School, 3rd to 10th (High School) -> English School
  content = content.replace(
    /const isFoundationSchool = \[.*?\]\.includes\(String\(reportCard\.class\.name\)\.toLowerCase\(\)\.trim\(\)\);/s,
    'const isFoundationSchool = ["jr.kg", "sr.kg", "jr. kg", "sr. kg", "junior kg", "senior kg", "1st", "2nd"].includes(String(reportCard.class.name).toLowerCase().trim());'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated:', filePath);
}
