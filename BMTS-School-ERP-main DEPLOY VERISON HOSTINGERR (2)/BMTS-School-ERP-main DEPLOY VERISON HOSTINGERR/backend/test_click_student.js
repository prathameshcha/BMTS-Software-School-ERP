const puppeteer = require('puppeteer');

async function testTeacherReportCard() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  console.log('--- Logging in as teacher.3a@mtfschool.edu ---');
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });
  await page.type('input[type="text"]', 'teacher.3a@mtfschool.edu');
  await page.type('input[type="password"]', 'Faculty@123');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {}),
    page.click('button[type="submit"]')
  ]);

  await new Promise(r => setTimeout(r, 1000));
  console.log('Navigating to /faculty/report-cards...');
  await page.goto('http://localhost:3000/faculty/report-cards', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  const rows = await page.$$('tbody tr');
  console.log(`Found ${rows.length} rows in teacher report card table`);

  let clicked = false;
  for (const row of rows) {
    const text = await (await row.getProperty('innerText')).jsonValue();
    if (text.includes('Class 3rd') || text.includes('3rd') || text.includes('Vikas')) {
      console.log('Found 3rd class student row:', text.replace(/\n/g, ' '));
      const buttons = await row.$$('button');
      if (buttons.length > 0) {
        await buttons[0].click();
        clicked = true;
        break;
      }
    }
  }

  if (!clicked && rows.length > 0) {
    console.log('Clicking first row button...');
    const buttons = await rows[0].$$('button');
    if (buttons.length > 0) {
      await buttons[0].click();
      clicked = true;
    }
  }

  await new Promise(r => setTimeout(r, 2500));
  const screenshotPath = 'C:\\Users\\chava\\.gemini\\antigravity\\brain\\65ee59f4-a6f9-456b-a722-210bfefd76cb\\report_card_modal_fixed_3rd.png';
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log('Saved screenshot to:', screenshotPath);

  // Print text inside modal or preview
  const modalText = await page.evaluate(() => {
    const modal = document.querySelector('[role="dialog"]') || document.querySelector('.fixed');
    return modal ? modal.innerText : 'NO MODAL FOUND';
  });

  console.log('--- MODAL TEXT PREVIEW ---');
  console.log(modalText.substring(0, 800));

  const hasPhysical = modalText.includes('Physical Development');
  const hasSocial = modalText.includes('Social Emotional Development');
  const hasCognitive = modalText.includes('Cognitive Development');
  const hasLanguage = modalText.includes('Language & Literacy');
  const hasCreative = modalText.includes('Creative & Aesthetic');
  const hasMarathiAnnual = modalText.includes('वार्षिक प्रगती अहवाल पत्रक');

  console.log('=== VERIFICATION RESULTS ===');
  console.log('Has Physical Development (SHOULD BE FALSE):', hasPhysical);
  console.log('Has Social Emotional Development (SHOULD BE FALSE):', hasSocial);
  console.log('Has Cognitive Development (SHOULD BE FALSE):', hasCognitive);
  console.log('Has Language & Literacy (SHOULD BE FALSE):', hasLanguage);
  console.log('Has Creative & Aesthetic (SHOULD BE FALSE):', hasCreative);
  console.log('Has Marathi Annual Marksheet Title (वार्षिक प्रगती अहवाल पत्रक) (SHOULD BE TRUE):', hasMarathiAnnual);

  await browser.close();
}

testTeacherReportCard().catch(console.error);
