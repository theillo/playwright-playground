import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { Payment } from '../pages/payment.page';

test.describe('payment tests', () => {
    test.beforeEach(async ({ page }) => {
        const userID = loginData.userId;
        const userPassword = loginData.userPassword;
        await page.goto('/');
        const payment = new Payment(page);

        await payment.loginInput.fill(userID);
        await payment.passwordInput.fill(userPassword);
        await payment.loginBtn.click();

        // await page.getByRole('link', { name: 'płatności' }).click();
        await page.locator('#payments_btn').click();
    });
    test.only('simple payment', async ({ page }) => {
        const payment = new Payment(page);
        //headed debugg slowdown test
        // function slowLocator(page: Page, waitInMs: number): (...args: any[]) => Locator {
        //     const l = page.locator.bind(page);
        //     return (locatorArgs) => {
        //         const locator = l(locatorArgs);
        //         locator.click = async (args) => {
        //             await new Promise((r) => setTimeout(r, waitInMs));
        //             return l(locatorArgs).click(args);
        //         };
        //         locator.fill = async (args) => {
        //             await new Promise((r) => setTimeout(r, waitInMs));
        //             return l(locatorArgs).fill(args);
        //         };
        //         return locator;
        //     };
        // }
        // page.locator = slowLocator(page, 500);

        //Arrange
        const transferReciver = 'Jan Nowak';
        const accountNumber = '11 2232 4442 2123 1232 1234 2312';
        const address = 'Bekowa 23/1';
        const postCode = '300-30';
        const adress2 = 'parkowa';
        const price = '159,20';
        const transferTitle = 'Przelew za xbopa';
        const email = 'test@gmail.com';
        const message = `Przelew wykonany! ${price}PLN dla Jan Nowak`;
        //Act
        await page.getByTestId('transfer_receiver').fill(transferReciver);
        await page.getByTestId('form_account_to').fill(accountNumber);
        await page
            .locator(
                '#transfer_new_out > div.form-fields > div:nth-child(4) > div.grid-20.mt-hide.ms-hide.form-static > span'
            )
            .click();
        await expect(page.locator('#form_address')).toHaveCSS('display', 'block');
        await payment.addressLocator(1).fill(address);
        await payment.addressLocator(2).fill(postCode);
        await payment.addressLocator(3).fill(adress2);
        await payment.formAmount.fill(price);
        await payment.formTitle.fill(transferTitle);
        await payment.uniformEmail.click();
        await payment.formEmail.fill(email);
        await payment.formReciver.click();
        await payment.formTrusted.check();
        await payment.exectuteBtn.click();
        await payment.closeBtn.click();
        //Assert
        await expect(payment.messageText).toHaveText(message);
    });
});
