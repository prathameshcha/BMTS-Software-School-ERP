const fs = require('fs');
const code = fs.readFileSync('hostinger bmts erp/public_html/assets/index-v4.js', 'utf8');

const printBtnMatch = code.match(/.{0,50}Print Report Card.{0,50}/);
console.log('Print match:', printBtnMatch ? printBtnMatch[0] : 'Not found');

const viewBtnMatch = code.match(/.{0,50}View \& Print Report Card.{0,100}/);
console.log('View btn match:', viewBtnMatch ? viewBtnMatch[0] : 'Not found');

const rMatch = code.match(/.{0,50}Remark 1.{0,50}/);
console.log('Remark 1 match:', rMatch ? rMatch[0] : 'Not found');

const fMatch = code.match(/.{0,100}path:"report-cards".{0,50}/g);
console.log('Report cards path match:', fMatch);
