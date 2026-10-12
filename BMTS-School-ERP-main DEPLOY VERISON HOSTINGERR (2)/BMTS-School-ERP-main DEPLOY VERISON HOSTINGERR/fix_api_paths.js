const fs = require('fs');
let code = fs.readFileSync('frontend/src/pages/admin/ReportCardManagement.tsx', 'utf8');

code = code.replace(/apiClient\.get\('\/api\/settings'\)/g, "apiClient.get('/settings')");
code = code.replace(/apiClient\.put\('\/api\/settings'/g, "apiClient.put('/settings'");

fs.writeFileSync('frontend/src/pages/admin/ReportCardManagement.tsx', code);

let code2 = fs.readFileSync('frontend/src/pages/faculty/ReportCardDrafting.tsx', 'utf8');
code2 = code2.replace(/apiClient\.get\('\/api\/settings'\)/g, "apiClient.get('/settings')");
fs.writeFileSync('frontend/src/pages/faculty/ReportCardDrafting.tsx', code2);

console.log('Fixed API URLs');
