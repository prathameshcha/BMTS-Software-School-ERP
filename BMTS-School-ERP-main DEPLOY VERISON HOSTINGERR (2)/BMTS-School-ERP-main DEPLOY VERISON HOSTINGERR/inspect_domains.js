const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'public_html', 'assets', 'index-v3.js');
const c = fs.readFileSync(file, 'utf8');

const pos = c.indexOf('Physical Development');
console.log('Pos:', pos);
console.log(c.substring(pos - 1200, pos + 600));
