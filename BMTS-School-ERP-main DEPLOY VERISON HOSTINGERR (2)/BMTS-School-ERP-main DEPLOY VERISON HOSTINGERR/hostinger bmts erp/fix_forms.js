const fs = require('fs');
let code = fs.readFileSync('frontend/src/pages/admin/StudentManagement.tsx', 'utf8');

const fieldsJSX = `
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Adhar No.</label>
                <Input value={formData.aadharNo || ''} onChange={(e) => setFormData({ ...formData, aadharNo: e.target.value })} />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Birth Place</label>
                <Input value={formData.birthPlace || ''} onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })} />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">PEN No.</label>
                <Input value={formData.penNo || ''} onChange={(e) => setFormData({ ...formData, penNo: e.target.value })} />
              </div>
            </div>`;

// Replace in both forms (Create and Edit)
// Find the closing div of the "grid-cols-3" that contains Mother Tongue, and inject our new fields after it.
code = code.replace(
  /onChange=\{\(e\) => setFormData\(\{ \.\.\.formData, motherTongue: e\.target\.value \}\)\}\s*(?:placeholder=".*?")?\s*\/>\s*<\/div>\s*<\/div>/g,
  (match) => match + '\n' + fieldsJSX
);

fs.writeFileSync('frontend/src/pages/admin/StudentManagement.tsx', code);
console.log('Done inserting form fields.');
