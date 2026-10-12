const fs = require('fs');
const path = require('path');

const assetDirs = [
  path.join(__dirname, 'public_html', 'assets'),
  path.join(__dirname, '..', 'deploy_ready', 'public_html', 'assets')
];

for (const dir of assetDirs) {
  if (!fs.existsSync(dir)) continue;
  const jsFiles = fs.readdirSync(dir).filter(f => f.startsWith('index') && f.endsWith('.js'));

  for (const jsFile of jsFiles) {
    const filePath = path.join(dir, jsFile);
    let code = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Find photo field in student add/edit form
    // Pattern: placeholder:"Photo URL" 
    const photoUrlTarget = 'placeholder:"Photo URL"';
    if (code.includes(photoUrlTarget) && !code.includes('Upload Photo')) {
      // Replace the simple photo text input with text input + upload button
      const photoReplacement = 'placeholder:"Photo URL (or click Upload)",className:"text-sm h-9 flex-1"';
      code = code.replace(
        photoUrlTarget,
        photoReplacement
      );
      modified = true;
      console.log(`[${jsFile}] Updated photo placeholder`);
    }

    // 2. Find the photo label and add upload button
    // Pattern: children:"Photo"  (the label for photo field)
    // We look for the label "Photo" near the photo input
    const photoLabelTarget = 'children:"Photo"}),';
    if (code.includes(photoLabelTarget) && !code.includes('📷 Upload Photo')) {
      code = code.replace(
        photoLabelTarget,
        'children:"Photo"}),e.jsx("label",{className:"cursor-pointer inline-flex items-center gap-1 px-2 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700",children:[e.jsx("input",{type:"file",accept:"image/*",className:"hidden",onChange:async ev=>{const file=ev.target.files?.[0];if(!file)return;const fd=new FormData;fd.append("photo",file);try{const r=await fetch("/api/upload/photo",{method:"POST",body:fd});const j=await r.json();if(j.success){const photoInput=document.querySelector(\'input[placeholder*="Photo URL"]\');if(photoInput){const nativeInputValueSetter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set;nativeInputValueSetter.call(photoInput,j.data.url);photoInput.dispatchEvent(new Event("input",{bubbles:true}))}}}catch(err){console.error(err)}}}),"📷 Upload Photo"]}),'
      );
      modified = true;
      console.log(`[${jsFile}] Added photo upload button next to Photo label`);
    }

    // 3. Ensure faculty report card edit route is correct (_h component)
    // Already patched earlier - verify it exists
    if (code.includes('path:"report-cards",element:e.jsx(_h,{})')) {
      console.log(`[${jsFile}] ✓ Faculty report card edit route is correct`);
    }

    if (modified) {
      fs.writeFileSync(filePath, code, 'utf8');
      console.log(`  Saved: ${filePath}`);
    }
  }
}

console.log('\nDone! Photo upload button added to student form.');
