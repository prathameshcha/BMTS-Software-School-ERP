const fs = require('fs');
let code = fs.readFileSync('backend/src/routes/pdf.routes.ts', 'utf8');

// 1. Fix isKG
code = code.replace(
  'const isKG = true;',
  'const isKG = /^(jr|sr|junior|senior|kg)/i.test(reportCard.class.name);'
);

// 2. Replace Primary Header & Student Info
const oldPrimaryStart = `  <!-- Header -->
  <div style="background:linear-gradient(to right, #1e3a5f, #2d3748); color:white; text-align:center; padding:10px 8px; margin-bottom:8px;">
    <div style="font-size:9px; letter-spacing:2px;">HUMAN RESOURCE DEVELOPMENT CENTER'S</div>
    <div style="font-size:14px; font-weight:bold; letter-spacing:1px;">BHARAT RATNA</div>
    <div style="font-size:13px; font-weight:bold;">MOTHER TERESA FOUNDATION SCHOOL</div>
    <div style="font-size:10px;">\${settings?.address || 'Gangapur Dist. Chha. Sambhajinagar - 431109'}</div>
    <div style="font-size:12px; font-weight:bold; margin-top:4px;">PROGRESS REPORT CARD — \${ay.name}</div>
  </div>

  <!-- Student Info -->
  <table style="width:100%; border:1px solid #93c5fd; margin-bottom:8px;">
    <tr>
      <td style="padding:4px 8px; font-size:10px; width:25%; border-right:1px solid #93c5fd;">
        <strong>Name:</strong><br/>\${reportCard.student.name}
      </td>
      <td style="padding:4px 8px; font-size:10px; width:20%; border-right:1px solid #93c5fd;">
        <strong>Class:</strong> \${reportCard.class.name}<br/>
        <strong>Division:</strong> \${reportCard.division.name}
      </td>
      <td style="padding:4px 8px; font-size:10px; width:20%; border-right:1px solid #93c5fd;">
        <strong>Roll No:</strong> \${reportCard.student.rollNo || ''}<br/>
        <strong>Admission No:</strong> \${reportCard.student.admissionNo}
      </td>
      <td style="padding:4px 8px; font-size:10px; width:20%; border-right:1px solid #93c5fd;">
        <strong>Academic Year:</strong><br/>\${ay.name}
      </td>
      <td style="padding:4px 8px; font-size:10px; width:15%; text-align:center;">
        \${reportCard.student.photo ? \`
          <img src="\${reportCard.student.photo}" style="width:60px; height:70px; object-fit:cover; border:1px solid #93c5fd; display:block; margin:auto;" />
        \` : \`
          <div style="border:1px dashed #999; width:60px; height:70px; margin:auto; display:flex; align-items:center; justify-content:center; font-size:8px; color:#999;">Photo</div>
        \`}
      </td>
    </tr>
  </table>`;

const newPrimaryStart = `  <!-- Header -->
  <div style="background:linear-gradient(to right, #5a0020, #7a003a); color:white; display:flex; justify-content:space-between; align-items:center; padding:10px 12px; border-bottom:2px solid #d97706; margin-bottom:8px;">
      <div style="width:48px; height:48px; border-radius:6px; border:1px solid #fbbf24; overflow:hidden; background:white; shrink:0; display:flex; align-items:center; justify-content:center;">
        \${mtBase64 ? \`<img src="\${mtBase64}" style="width:100%; height:100%; object-fit:cover;" />\` : ''}
      </div>
      <div style="text-align:center; flex:1; padding:0 8px; line-height:1.2;">
        <div style="font-size:8px; font-weight:600; color:#fde68a; letter-spacing:1px; text-transform:uppercase;">Human Resource Development Center's</div>
        <div style="font-size:9px; font-weight:bold; color:#fbbf24;">Bharat Ratna</div>
        <div style="font-size:12px; font-weight:900; color:white; text-transform:uppercase; margin-top:2px;">\${schoolNameHeader}</div>
        <div style="font-size:8px; color:#f3f4f6; margin-top:1px;">Gangapur Dist.Chha.Sambhajinagar - 431109</div>
      </div>
      <div style="width:48px; height:48px; border-radius:6px; border:1px solid #fbbf24; overflow:hidden; background:white; shrink:0; display:flex; align-items:center; justify-content:center;">
        \${logoBase64 ? \`<img src="\${logoBase64}" style="width:100%; height:100%; object-fit:contain;" />\` : ''}
      </div>
  </div>

  <div style="text-align:center; margin-top:4px;">
    <span style="font-size:12px; font-weight:bold; color:#a21caf;">First Term Progress Report Std. \${reportCard.class.name}</span>
  </div>

  <div style="display:flex; justify-content:space-between; margin-top:12px; padding:0 12px; font-size:12px; font-weight:bold; margin-bottom:16px;">
    <div style="flex:1;">
      <div style="margin-bottom:18px; display:flex; align-items:flex-end;">
        <span style="width:55px;">Name :</span>
        <span style="flex:1; border-bottom:1px solid #000; padding-left:8px; font-weight:normal;">\${reportCard.student.name}</span>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:flex-end;">
        <div style="display:flex; align-items:flex-end; flex:1;">
          <span style="width:45px;">Class :</span>
          <span style="flex:1; border-bottom:1px solid #000; padding-left:8px; font-weight:normal;">\${reportCard.class.name}</span>
        </div>
        <div style="display:flex; align-items:flex-end; flex:1; margin:0 12px;">
          <span style="width:35px;">Div :</span>
          <span style="flex:1; border-bottom:1px solid #000; padding-left:8px; font-weight:normal;">\${reportCard.division.name}</span>
        </div>
        <div style="display:flex; align-items:flex-end; flex:1;">
          <span style="width:55px;">Roll No.</span>
          <span style="flex:1; border-bottom:1px solid #000; padding-left:8px; font-weight:normal;">\${reportCard.student.rollNo || ''}</span>
        </div>
      </div>
    </div>
    
    <div style="width:70px; height:85px; border:1px solid #000; border-radius:6px; margin-left:24px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; font-weight:normal; font-size:12px;">
      \${reportCard.student.photo ? \`<img src="\${reportCard.student.photo}" style="width:100%; height:100%; object-fit:cover; border-radius:5px;" />\` : \`Affix<br/>Photo\`}
    </div>
  </div>`;

if (code.includes(oldPrimaryStart)) {
  code = code.replace(oldPrimaryStart, newPrimaryStart);
  fs.writeFileSync('backend/src/routes/pdf.routes.ts', code);
  console.log('Replaced successfully');
} else {
  console.error('Target string not found');
}
