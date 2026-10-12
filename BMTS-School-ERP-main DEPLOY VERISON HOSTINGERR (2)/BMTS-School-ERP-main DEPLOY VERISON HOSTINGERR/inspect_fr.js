const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'public_html', 'assets', 'index-v3.js');
const c = fs.readFileSync(file, 'utf8');

const frMatch = c.match(/function fr\s*\(/);
if (frMatch) {
  console.log('function fr found at index:', frMatch.index);
  console.log(c.substring(frMatch.index, frMatch.index + 2500));
} else {
  console.log('function fr not found');
}
