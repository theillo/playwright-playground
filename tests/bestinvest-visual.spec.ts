const { test, expect } = require('@playwright/test');

test.describe.skip('Full screen page', () => {
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

test.describe.skip('Img check', () => {
    test('Img check', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto('http://localhost:3000/pension-calculator/');
        const locatorX = page.locator('#testVisual');
        await expect(locatorX).toHaveScreenshot();
    });
});

// main img : https://i.stack.imgur.com/hiigg.png
// replace img : https://i.stack.imgur.com/evIQl.png

// npx playwright test --update-snapshots

// maxDiffPixelRatio - this value can be between 0 and 1 and is defined as the acceptable amount of pixels that can differ from the total amount of pixels.
// maxDiffPixels - this can be any value and is just a count of how many pixels can be different - it's worth experimenting with your test execution and seeing what an acceptable difference is.
// Threshold - this value can be between 0 (strict) and 1 (lax) and is the acceptable perceived color difference between the same pixel in the compared images - again, this is worth experimenting with and seeing how strict you want it to be.
// await expect(headerLogo).toHaveScreenshot({ maxDiffPixelRatio: 0.1 })
// await expect(headerLogo).toHaveScreenshot({ maxDiffPixels: 100 })
// await expect(headerLogo).toHaveScreenshot({ threshold: 0.1 })

// for full page
// animations: “disabled” - this will stop any CSS animations or transitions on your webpage.
// maxDiffPixelRatio: 0.2 - which we covered earlier, will allow some room for minor differences.
// await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.2 });
