const { test, expect } = require('@playwright/test');

test.describe('Full screen page', () => {
  test('Full page homepage - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000/isa-and-junior-isa/');
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
  test('Full page homepage - laptop', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto('http://localhost:3000/isa-and-junior-isa/');
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
  test('Full page homepage - tablet', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('http://localhost:3000/isa-and-junior-isa/');
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
  
  test('Full page homepage -  mobile', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('http://localhost:3000/isa-and-junior-isa/');
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});

test.describe('Iframe check', () => {
  test.only('Iframe check', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000/pension-calculator/');
    const locatorX = page.locator('#testVisual')
    await expect(locatorX).toHaveScreenshot();
  });
});

// main img : https://i.stack.imgur.com/hiigg.png
// replace img : https://i.stack.imgur.com/evIQl.png


// npx playwright test --update-snapshots