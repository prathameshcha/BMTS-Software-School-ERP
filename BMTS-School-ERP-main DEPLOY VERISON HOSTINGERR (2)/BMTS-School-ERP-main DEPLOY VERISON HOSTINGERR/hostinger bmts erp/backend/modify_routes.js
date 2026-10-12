const fs = require('fs');
let code = fs.readFileSync('backend/src/routes/students.routes.ts', 'utf8');

code = code.replace(
  'parentContact, parentEmail, address, bloodGroup, height, weight',
  'parentContact, parentEmail, address, aadharNo, birthPlace, penNo, bloodGroup, height, weight'
);

code = code.replace(
  'address: address || null,',
  'address: address || null,\n            aadharNo: aadharNo || null,\n            birthPlace: birthPlace || null,\n            penNo: penNo || null,'
);

code = code.replace(
  'address: address !== undefined ? address : undefined,',
  'address: address !== undefined ? address : undefined,\n        aadharNo: aadharNo !== undefined ? aadharNo : undefined,\n        birthPlace: birthPlace !== undefined ? birthPlace : undefined,\n        penNo: penNo !== undefined ? penNo : undefined,'
);

fs.writeFileSync('backend/src/routes/students.routes.ts', code);
