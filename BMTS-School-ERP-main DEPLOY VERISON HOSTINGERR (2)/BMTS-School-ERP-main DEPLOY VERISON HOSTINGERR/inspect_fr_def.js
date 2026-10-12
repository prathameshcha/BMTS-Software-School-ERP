const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'public_html', 'assets', 'index-v3.js');
const c = fs.readFileSync(file, 'utf8');

const matches = [...c.matchAll(/(const|let|var)\s+fr\s*=/g)];
for (const m of matches) {
  console.log('Match at', m.index);
  console.log(c.substring(m.index, m.index + 1200));
}

// Also search backwards from pos 375513 where fr is used
const frUse = c.indexOf('e.jsx(fr,{reportCard');
console.log('fr used at:', frUse);
