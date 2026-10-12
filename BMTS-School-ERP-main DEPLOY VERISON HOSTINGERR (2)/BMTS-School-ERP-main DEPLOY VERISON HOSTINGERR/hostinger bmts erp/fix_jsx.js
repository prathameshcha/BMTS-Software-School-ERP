const fs = require('fs');
let code = fs.readFileSync('frontend/src/pages/admin/ReportCardManagement.tsx', 'utf8');

// The code looks like this:
//       {/* Term Permissions */}
//       (
//         <Card ...>
//         ...
//         </Card>
//       )}

// First, fix the opening part to be just the Card without the grouping parenthesis
code = code.replace(
  /\{\/\* Term Permissions \*\/\}\s*\(\s*(<Card className="border-indigo-100 bg-indigo-50\/50 shadow-sm">)/,
  '{/* Term Permissions */}\n      $1'
);

// Second, fix the closing part. 
// We know it ends with `</Card>\n      )}`
code = code.replace(
  /<\/Card>\s*\)\}/g,
  '</Card>'
);

fs.writeFileSync('frontend/src/pages/admin/ReportCardManagement.tsx', code);
console.log('Fixed JSX');
