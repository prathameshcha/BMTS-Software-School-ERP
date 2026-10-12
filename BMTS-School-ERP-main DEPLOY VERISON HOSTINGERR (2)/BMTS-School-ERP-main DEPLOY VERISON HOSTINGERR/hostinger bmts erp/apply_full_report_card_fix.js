const { PrismaClient } = require('./backend/node_modules/@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

async function fixAllReportCards() {
  console.log('1. Updating all classes in database to reportCardTemplate = "KG"...');
  const updated = await prisma.class.updateMany({
    data: { reportCardTemplate: 'KG' }
  });
  console.log(`Updated ${updated.count} classes in database.`);

  const assetDirs = [
    path.join(__dirname, 'public_html', 'assets'),
    path.join(__dirname, '..', 'deploy_ready', 'public_html', 'assets')
  ];

  for (const assetsDir of assetDirs) {
    if (!fs.existsSync(assetsDir)) continue;
    const files = fs.readdirSync(assetsDir).filter(f => f.endsWith('.js'));

    for (const file of files) {
      const filePath = path.join(assetsDir, file);
      let code = fs.readFileSync(filePath, 'utf8');
      let changed = false;

      // 1. Force _isKG = true and _isSec = false in report card modal viewer
      if (code.includes('const _isSec=') && code.includes('if(!_isKG)')) {
        const p1 = code.indexOf('const _isSec=');
        const p2 = code.indexOf('if(!_isKG)', p1);
        if (p1 !== -1 && p2 !== -1) {
          const oldChunk = code.substring(p1, p2 + 'if(!_isKG)'.length);
          const newChunk = 'const _isSec=false;const _isKG=true;if(false)';
          code = code.replace(oldChunk, newChunk);
          changed = true;
          console.log(`Replaced modal template router in ${file}`);
        }
      }

      // 2. Force L = true (enable 5 development domain tabs A-E) in evaluation page
      if (code.includes('L=((_t=a==null?void 0:a.class)==null?void 0:_t.reportCardTemplate)==="KG"')) {
        const pL = code.indexOf('L=((_t=a==null?void 0:a.class)==null?void 0:_t.reportCardTemplate)==="KG"');
        const pEnd = code.indexOf(',ce=', pL);
        if (pL !== -1 && pEnd !== -1) {
          code = code.substring(0, pL) + 'L=true' + code.substring(pEnd);
          changed = true;
          console.log(`Enabled 5 domain tabs (L=true) in ${file}`);
        }
      }

      // 3. Force ce = false (disable secondary evaluation view that hides A-E)
      if (code.includes('ce=/^(8|8th|9|9th|10|10th|VIII|IX|X)$/i.test')) {
        const pCe = code.indexOf('ce=/^(8|8th|9|9th|10|10th|VIII|IX|X)$/i.test');
        const pMe = code.indexOf(',Me=', pCe);
        if (pCe !== -1 && pMe !== -1) {
          code = code.substring(0, pCe) + 'ce=false' + code.substring(pMe);
          changed = true;
          console.log(`Disabled secondary view (ce=false) in ${file}`);
        }
      }

      if (changed) {
        fs.writeFileSync(filePath, code, 'utf8');
        console.log(`Saved updated bundle: ${filePath}`);
      }
    }
  }

  console.log('All patches applied successfully!');
}

fixAllReportCards()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
