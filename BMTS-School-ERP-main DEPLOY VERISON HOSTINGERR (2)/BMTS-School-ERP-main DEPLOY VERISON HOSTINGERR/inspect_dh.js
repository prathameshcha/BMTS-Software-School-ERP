const fs = require('fs');
const path = require('path');

const js = fs.readFileSync(path.join(__dirname, 'hostinger bmts erp', 'public_html', 'assets', 'index-v4.js'), 'utf8');

// Find function/component dh
const dhIdx = js.lastIndexOf('function dh(');
console.log('function dh index:', dhIdx);

if (dhIdx !== -1) {
  // Let's print out the first 4000 characters of dh
  console.log('dh definition start:');
  console.log(js.substring(dhIdx, dhIdx + 5000));
} else {
  // Try const dh= or dh=
  const m = js.match(/const dh\s*=\s*|function dh\s*\(/);
  console.log('dh match:', m);
}
