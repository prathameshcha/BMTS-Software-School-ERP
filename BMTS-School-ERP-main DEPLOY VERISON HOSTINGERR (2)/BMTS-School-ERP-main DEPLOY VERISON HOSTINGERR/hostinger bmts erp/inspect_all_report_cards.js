const puppeteer = require('./backend/node_modules/puppeteer');
const fs = require('fs');
const path = require('path');

async function inspectAllReportCards() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1000 });

  console.log('Logging in...');
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });
  await page.type('input[type="text"]', 'admin@mtfschool.edu');
  await page.type('input[type="password"]', 'Admin@123');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {}),
    page.click('button[type="submit"]')
  ]);

  await new Promise(r => setTimeout(r, 1500));
  await page.goto('http://localhost:3000/admin/report-cards', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  const targetClasses = ['Jr.KG', '1st', '3rd', '5th', '8th', '10th'];
  const rows = await page.$$('tbody tr');
  console.log(`Total rows: ${rows.length}`);

  for (const cName of targetClasses) {
    console.log(`\n=== Checking Class ${cName} ===`);
    let found = false;
    for (const row of rows) {
      const text = await (await row.getProperty('innerText')).jsonValue();
      if (text.includes(`Class ${cName}`) || text.includes(cName)) {
        found = true;
        console.log(`Found row: ${text.split('\n')[0]}`);
        const buttons = await row.$$('button');
        if (buttons.length > 0) {
          // Click view/edit button
          await buttons[0].click();
          await new Promise(r => setTimeout(r, 2500));

          // Capture modal screenshot
          const screenshotPath = path.join(__dirname, `screenshot_modal_${cName.replace('.', '')}.png`);
          await page.screenshot({ path: screenshotPath, fullPage: true });
          console.log(`Saved modal screenshot to: ${screenshotPath}`);

          // Extract full modal HTML / text structure
          const modalInfo = await page.evaluate(() => {
            const modal = document.querySelector('[role="dialog"]') || document.querySelector('.fixed.inset-0');
            if (!modal) return { found: false };
            const headers = Array.from(modal.querySelectorAll('h1, h2, h3, h4, .text-lg, .text-xl, .text-2xl, .text-base')).map(h => h.innerText.trim());
            const tabs = Array.from(modal.querySelectorAll('button[role="tab"], nav button, .border-b button')).map(b => b.innerText.trim());
            const tables = Array.from(modal.querySelectorAll('table')).map(t => {
              const ths = Array.from(t.querySelectorAll('th')).map(th => th.innerText.trim());
              return { ths, rowCount: t.querySelectorAll('tbody tr').length };
            });
            return { found: true, headers, tabs, tables };
          });

          console.log(`Modal Info for ${cName}:`, JSON.stringify(modalInfo, null, 2));

          // Press escape to close modal
          await page.keyboard.press('Escape');
          await new Promise(r => setTimeout(r, 1000));
          break;
        }
      }
    }
    if (!found) console.log(`No row found for Class ${cName}`);
  }

  await browser.close();
  console.log('\nInspection complete!');
}

inspectAllReportCards().catch(console.error);
