const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'backend', 'dist');
const assetsDir = path.join(__dirname, 'public_html', 'assets');
const deployAssetsDir = path.join(__dirname, '..', 'deploy_ready', 'public_html', 'assets');

// ============================================================
// PART 1: Add photo upload API endpoint to server.js
// ============================================================
const serverFile = path.join(distDir, 'server.js');
let serverCode = fs.readFileSync(serverFile, 'utf8');

if (!serverCode.includes('/api/upload/photo')) {
  // Add multer-based photo upload route before the 404 catch-all
  const uploadRoute = `
// Student Photo Upload endpoint
const multer_1 = require("multer");
const photoStorage = multer_1.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path_1.default.join(process.cwd(), 'uploads', 'photos');
        if (!fs_1.default.existsSync(uploadDir)) fs_1.default.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        cb(null, 'student_' + Date.now() + '_' + Math.random().toString(36).substring(2,8) + ext);
    }
});
const photoUpload = multer_1({ storage: photoStorage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files allowed'));
}});
app.post('/api/upload/photo', photoUpload.single('photo'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, error: 'No file uploaded' });
        const photoUrl = '/uploads/photos/' + req.file.filename;
        // If studentId is provided, update the student record
        if (req.body.studentId) {
            await database_js_1.prisma.student.update({ where: { id: req.body.studentId }, data: { photo: photoUrl } });
        }
        res.json({ success: true, data: { url: photoUrl, filename: req.file.filename } });
    } catch(err) { res.status(500).json({ success: false, error: err.message }); }
});
`;
  
  const insertBefore = `app.use('/api', (_req, res) => {`;
  serverCode = serverCode.replace(insertBefore, uploadRoute + insertBefore);
  fs.writeFileSync(serverFile, serverCode, 'utf8');
  console.log('✓ Added /api/upload/photo endpoint to server.js');
} else {
  console.log('  server.js — photo upload already exists');
}

// ============================================================
// PART 2: Add photo upload UI to frontend student form
// ============================================================
const assetDirs = [assetsDir, deployAssetsDir];

for (const dir of assetDirs) {
  if (!fs.existsSync(dir)) continue;
  const jsFiles = fs.readdirSync(dir).filter(f => f.endsWith('.js') && f.startsWith('index'));
  
  for (const jsFile of jsFiles) {
    const filePath = path.join(dir, jsFile);
    let code = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Find the student form photo field — currently it's just a text input for photo URL
    // We need to find the photo input and add a file upload button next to it
    // The form has: photo:"" in the initial state
    
    // Add photo upload handler function — inject after the student form component starts
    // Look for the photo text input and enhance it with file upload
    const photoInputTarget = 'placeholder:"Photo URL"';
    if (code.includes(photoInputTarget) && !code.includes('Upload Photo')) {
      const photoUploadReplacement = 'placeholder:"Photo URL (or use Upload button)"';
      code = code.replace(photoInputTarget, photoUploadReplacement);
      modified = true;
      console.log(`[${jsFile}] Updated photo input placeholder`);
    }

    // Find where photo input is rendered and add upload button after it
    // Pattern: value:X.photo, onChange:... for photo field
    const photoFieldPattern = /onChange:(\w+)=>\w+\({\.\.\.(\w+),photo:\1\.target\.value\}\)/;
    const photoMatch = code.match(photoFieldPattern);
    if (photoMatch && !code.includes('handlePhotoUpload')) {
      const formVar = photoMatch[2]; // the form state variable
      const fullMatch = photoMatch[0];
      
      // We inject a file input + upload handler
      // After the photo text input, add a file upload button
      const photoInputEnd = code.indexOf(fullMatch) + fullMatch.length;
      // Find the closing of the photo input JSX element
      const afterPhotoInput = code.indexOf('})', photoInputEnd);
      
      if (afterPhotoInput !== -1) {
        // Find the end of this JSX element to insert upload button after
        const insertPos = afterPhotoInput + 2;
        const uploadButtonCode = `,e.jsx("label",{className:"cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700 mt-1",children:[e.jsx("input",{type:"file",accept:"image/*",className:"hidden",onChange:async(ev)=>{const file=ev.target.files?.[0];if(!file)return;const fd=new FormData();fd.append("photo",file);try{const r=await fetch("/api/upload/photo",{method:"POST",body:fd});const j=await r.json();if(j.success){${formVar}=({...${formVar},photo:j.data.url})}}catch(e){console.error(e)}}}),"\uD83D\uDCF7 Upload Photo"]})`;
        
        code = code.substring(0, insertPos) + uploadButtonCode + code.substring(insertPos);
        modified = true;
        console.log(`[${jsFile}] Added photo upload button to student form`);
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, code, 'utf8');
      console.log(`Saved: ${filePath}`);
    }
  }
}

console.log('\n✓ Photo upload feature added!');
console.log('Restart server to apply backend changes.');
