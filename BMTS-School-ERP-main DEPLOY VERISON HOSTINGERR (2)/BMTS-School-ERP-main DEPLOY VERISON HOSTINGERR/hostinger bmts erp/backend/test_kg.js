const puppeteer = require('puppeteer');

async function testJrKgReportCard() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });
  await page.type('input[type="text"]', 'teacher.3a@mtfschool.edu');
  await page.type('input[type="password"]', 'Faculty@123');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {}),
    page.click('button[type="submit"]')
  ]);

  await new Promise(r => setTimeout(r, 1000));
  await page.goto('http://localhost:3000/faculty/report-cards', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  const rows = await page.$$('tbody tr');
  let clicked = false;
  for (const row of rows) {
    const text = await (await row.getProperty('innerText')).jsonValue();
    if (text.includes('Jr.KG') || text.includes('Jr KG') || text.includes('Sr.KG')) {
      console.log('Found KG student row:', text.replace(/\n/g, ' '));
      const buttons = await row.$$('button');
      if (buttons.length > 0) {
        await buttons[0].click();
        clicked = true;
        break;
      }
    }
  }

  await new Promise(r => setTimeout(r, 2000));
  const modalText = await page.evaluate(() => {
    const modal = document.querySelector('[role="dialog"]') || document.querySelector('.fixed');
    return modal ? modal.innerText : 'NO MODAL FOUND';
  });

  const hasPhysical = modalText.includes('Physical Development');
  console.log('KG student has Physical Development (SHOULD BE TRUE FOR KG):', hasPhysical);

  await browser.close();
}

testJrKgReportCard().catch(console.error);
