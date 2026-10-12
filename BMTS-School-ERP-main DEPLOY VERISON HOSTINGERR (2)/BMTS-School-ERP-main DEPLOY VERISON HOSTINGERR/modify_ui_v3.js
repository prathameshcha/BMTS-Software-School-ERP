const fs = require('fs');
let code = fs.readFileSync('frontend/src/pages/admin/StudentManagement.tsx', 'utf8');

// 1. initialForm
code = code.replace(
  /address: '',/g,
  `address: '',\n    aadharNo: '',\n    birthPlace: '',\n    penNo: '',`
);

// 2. handleOpenEdit
code = code.replace(
  /address: student\.address \|\| '',/g,
  `address: student.address || '',\n      aadharNo: student.aadharNo || '',\n      birthPlace: student.birthPlace || '',\n      penNo: student.penNo || '',`
);

// 3. Admission No -> General Register No
code = code.replace(/Admission No \*/g, 'General Register No *');

// 4. Create Modal JSX
const createFields = `
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
            </div>
`;

code = code.replace(
`                  placeholder="e.g. Marathi, Hindi, English"
                />
              </div>
            </div>`,
`                  placeholder="e.g. Marathi, Hindi, English"
                />
              </div>
            </div>
` + createFields
);

// 5. Edit Modal JSX
const editFields = `
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
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Class (Current)</label>
                <Select disabled value={formData.classId}>
                  {classes.map((c) => <option key={c.id} value={c.id}>Class {c.name}</option>)}
                </Select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Division (Current)</label>
                <Select disabled value={formData.divisionId}>
                  {divisions.map((d) => <option key={d.id} value={d.id}>Division {d.name}</option>)}
                </Select>
              </div>
            </div>
`;

code = code.replace(
`                <label className="block font-semibold text-slate-700 mb-1">Mother Tongue</label>
                <Input
                  value={formData.motherTongue}
                  onChange={(e) => setFormData({ ...formData, motherTongue: e.target.value })}
                />
              </div>
            </div>`,
`                <label className="block font-semibold text-slate-700 mb-1">Mother Tongue</label>
                <Input
                  value={formData.motherTongue}
                  onChange={(e) => setFormData({ ...formData, motherTongue: e.target.value })}
                />
              </div>
            </div>
` + editFields
);

fs.writeFileSync('frontend/src/pages/admin/StudentManagement.tsx', code);
