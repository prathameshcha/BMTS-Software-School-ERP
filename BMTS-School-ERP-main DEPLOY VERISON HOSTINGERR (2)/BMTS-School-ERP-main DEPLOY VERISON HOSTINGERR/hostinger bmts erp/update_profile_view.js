const fs = require('fs');
let code = fs.readFileSync('frontend/src/pages/admin/StudentManagement.tsx', 'utf8');

const regex = /<div className="space-y-1\.5 text-slate-700">[\s\S]*?<div><span className="text-slate-400">Gender:<\/span> <strong>\{activeStudent\.gender \|\| 'N\/A'\}<\/strong><\/div>\s*<\/div>/;

const newPersonalDetails = `<div className="space-y-1.5 text-slate-700">
                  <div><span className="text-slate-400">Date of Birth:</span> <strong>{activeStudent.dob ? new Date(activeStudent.dob).toLocaleDateString() : 'N/A'}</strong></div>
                  <div><span className="text-slate-400">Birth Place:</span> <strong>{activeStudent.birthPlace || 'N/A'}</strong></div>
                  <div><span className="text-slate-400">Age:</span> <strong>{activeStudent.age ? \`\${activeStudent.age} Years\` : 'N/A'}</strong></div>
                  <div><span className="text-slate-400">Gender:</span> <strong>{activeStudent.gender || 'N/A'}</strong></div>
                  <div><span className="text-slate-400">Mother Tongue:</span> <strong>{activeStudent.motherTongue || 'N/A'}</strong></div>
                  <div className="pt-2 border-t mt-2">
                    <span className="text-slate-400">Adhar No:</span> <strong className="font-mono text-indigo-700">{activeStudent.aadharNo || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">PEN No:</span> <strong className="font-mono text-emerald-700">{activeStudent.penNo || 'N/A'}</strong>
                  </div>
                </div>`;

if (regex.test(code)) {
  code = code.replace(regex, newPersonalDetails);
  code = code.replace('Adm #{activeStudent.admissionNo}', 'Gen Reg #{activeStudent.admissionNo}');
  fs.writeFileSync('frontend/src/pages/admin/StudentManagement.tsx', code);
  console.log('Successfully updated the profile view modal.');
} else {
  console.error('Regex did not match.');
}
