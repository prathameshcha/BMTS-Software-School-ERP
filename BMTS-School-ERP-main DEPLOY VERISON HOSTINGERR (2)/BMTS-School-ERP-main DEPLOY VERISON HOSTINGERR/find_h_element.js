const fs = require('fs');
const path = require('path');

const js = fs.readFileSync(path.join(__dirname, 'hostinger bmts erp', 'public_html', 'assets', 'index-v4.js'), 'utf8');

// Let's find where _h is used as an element in routes (e.g., element:e.jsx(_h,{}))
let idx = 0;
while ((idx = js.indexOf('_h', idx)) !== -1) {
  const snippet = js.substring(Math.max(0, idx - 40), idx + 40);
  if (snippet.includes('element:') || snippet.includes('path:') || snippet.includes('jsx')) {
    console.log('Match at', idx, ':', snippet);
  }
  idx += 2;
}
