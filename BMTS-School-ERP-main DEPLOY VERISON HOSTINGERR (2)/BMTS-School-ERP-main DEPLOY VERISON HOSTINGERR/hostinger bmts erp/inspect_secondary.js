const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'public_html', 'assets', 'index-v3.js');
const c = fs.readFileSync(file, 'utf8');

const pos = 37562;
console.log(c.substring(pos - 300, pos + 1200));
