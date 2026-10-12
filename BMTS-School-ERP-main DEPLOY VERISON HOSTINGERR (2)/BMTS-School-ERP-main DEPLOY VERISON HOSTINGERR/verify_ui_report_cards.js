const puppeteer = require('./backend/node_modules/puppeteer');
const path = require('path');

async function testReportCardScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  console.log('1. Logging in...');
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });
  await page.type('input[type="text"]', 'admin@mtfschool.edu');
  await page.type('input[type="password"]', 'Admin@123');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {}),
    page.click('button[type="submit"]')
  ]);

  await new Promise(r => setTimeout(r, 1500));
  console.log('2. Navigating to report cards...');
  await page.goto('http://localhost:3000/admin/report-cards', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  const rows = await page.$$('tbody tr');
  console.log(`Found ${rows.length} rows in table`);

  for (const targetClass of ['3rd', '10th', 'Jr.KG']) {
    for (const row of rows) {
      const text = await (await row.getProperty('innerText')).jsonValue();
      if (text.includes(`Class ${targetClass}`) || text.includes(targetClass)) {
        console.log(`Found row for ${targetClass}:`, text.split('\n')[0]);
        const buttons = await row.$$('button');
        if (buttons.length > 0) {
          await buttons[0].click();
          await new Promise(r => setTimeout(r, 2000));
          
          const modalHeader = await page.evaluate(() => {
            const h1 = document.querySelector('[role="dialog"] h1, .fixed h1');
            return h1 ? h1.innerText : 'No H1 in modal';
          });
          console.log(`Class ${targetClass} UI Header in Modal: ${modalHeader}`);

          await page.keyboard.press('Escape');
          await new Promise(r => setTimeout(r, 1000));
          break;
        }
      }
    }
  }

  await browser.close();
  console.log('Done test successfully!');
}

testReportCardScreenshots().catch(console.error);
