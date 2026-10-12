const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'public_html', 'assets', 'index-v3.js');
const c = fs.readFileSync(file, 'utf8');

let pos = 0;
while ((pos = c.indexOf('fr=', pos)) !== -1) {
  console.log('fr= at pos', pos, ':', c.substring(Math.max(0, pos - 30), Math.min(c.length, pos + 200)));
  pos += 3;
}
