const fs = require('fs');
let code = fs.readFileSync('frontend/src/pages/admin/ReportCardManagement.tsx', 'utf8');

code = code.replace(
  /\{\s*\/\*\s*Term Permissions\s*\*\/\s*\}\s*\{settings\s*&&\s*\(/,
  '{/* Term Permissions */}\n      ('
);

fs.writeFileSync('frontend/src/pages/admin/ReportCardManagement.tsx', code);
console.log('Removed settings && check');
