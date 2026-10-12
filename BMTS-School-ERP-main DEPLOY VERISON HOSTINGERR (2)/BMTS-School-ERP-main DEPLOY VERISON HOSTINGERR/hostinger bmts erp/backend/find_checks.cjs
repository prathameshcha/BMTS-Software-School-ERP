const fs = require('fs');
const content = fs.readFileSync('public_html/assets/index-v4.js', 'utf8');

let idx = 0;
while ((idx = content.indexOf('1st', idx)) !== -1) {
  const snippet = content.substring(Math.max(0, idx - 80), Math.min(content.length, idx + 150));
  if (snippet.includes('jr.kg') || snippet.includes('reportCardTemplate') || snippet.includes('includes(')) {
    console.log('--- Match at', idx, '---');
    console.log(snippet);
  }
  idx += 3;
}
