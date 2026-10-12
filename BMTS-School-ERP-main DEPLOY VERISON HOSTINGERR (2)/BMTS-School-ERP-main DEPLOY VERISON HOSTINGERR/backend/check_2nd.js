const puppeteer = require('puppeteer');

async function check2ndReportCard() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });
  await page.type('input[type="text"]', 'admin@mtfschool.edu');
  await page.type('input[type="password"]', 'Admin@123');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {}),
    page.click('button[type="submit"]')
  ]);

  await new Promise(r => setTimeout(r, 1000));
  await page.goto('http://localhost:3000/admin/report-cards', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  const rows = await page.$$('tbody tr');
  console.log(`Found ${rows.length} rows`);

  for (const row of rows) {
    const text = await (await row.getProperty('innerText')).jsonValue();
    if (text.includes('2nd') || text.includes('Class 2nd')) {
      console.log('Found 2nd class row:', text.replace(/\n/g, ' '));
      const buttons = await row.$$('button');
      if (buttons.length > 0) {
        await buttons[0].click();
        break;
      }
    }
  }

  await new Promise(r => setTimeout(r, 2500));
  const shotPath = 'C:\\Users\\chava\\.gemini\\antigravity\\brain\\65ee59f4-a6f9-456b-a722-210bfefd76cb\\report_card_2nd_standard.png';
  await page.screenshot({ path: shotPath, fullPage: true });
  console.log('Saved screenshot of 2nd standard report card to:', shotPath);

  const modalText = await page.evaluate(() => {
    const modal = document.querySelector('[role="dialog"]') || document.querySelector('.fixed');
    return modal ? modal.innerText : 'NO MODAL FOUND';
  });
  console.log('2nd Standard modal text:\n', modalText.substring(0, 1500));

  await browser.close();
}

check2ndReportCard().catch(console.error);
