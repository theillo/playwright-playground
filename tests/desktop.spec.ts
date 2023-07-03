import { test, expect } from "@playwright/test";


//to invastingationß
test.describe("Desktop tests", () => {
    test('quick payment with correct data', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('testerLO');
        await page.getByTestId('password-input').fill('password');
        await page.getByTestId('login-button').click();
        await page.locator('#widget_1_transfer_receiver').selectOption('2');
        await page.locator('#widget_1_transfer_amount').fill('150');
        await page.locator('#widget_1_transfer_title').fill('pizza');
        await page.getByRole('button', { name: 'wykonaj' }).click();
        const popupClose = '.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.ui-dialog-buttons';
        // await page.waitForSelector(popupClose);
        await expect(page.locator(popupClose)).toHaveCSS('display', 'block')
        await page.getByTestId('close-button').click();
        // await page.waitForTimeout(1);
        // await expect(page.locator('#show_messages')).toHaveText(
        //   'Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza'
        // );
      });
      test('sucesfull mobile top-up', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('test1231');
        await page.getByTestId('password-input').fill('test1231');
        await page.getByTestId('login-button').click();
        // await page.selectOption('#widget_1_topup_receiver', '502 xxx xxx');
        await page.locator('#widget_1_topup_receiver').selectOption('504 xxx xxx');
        await page.locator('#widget_1_topup_amount').fill('40');
        // await page.locator('#uniform-widget_1_topup_agreement span').click();
        await page.locator('#uniform-widget_1_topup_agreement span').check();
        // await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.locator('#execute_phone_btn').click();
        await expect(page.locator('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.ui-dialog-buttons')).toHaveCSS('display', 'block');
        await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 40,00PLN na numer 504 xxx xxx');
        await page.getByTestId('close-button').click();
      });
});
