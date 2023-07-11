import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('payment tests', () => {
    test.beforeEach(async ({ page }) => {
        const userID = loginData.userId;
        const userPassword = loginData.userPassword;
        await page.goto('/');
        const loginPage = new LoginPage(page);

        await loginPage.loginInput.fill(userID);
        await loginPage.passwordInput.fill(userPassword);
        await loginPage.loginBtn.click();
        await page.getByRole('link', { name: 'płatności' }).click();
    });
    test('simple payment', async ({ page }) => {
        //headed debugg slowdown test
        // function slowLocator(page: Page, waitInMs: number): (...args: any[]) => Locator {
        //     // Grab original
        //     const l = page.locator.bind(page);

        //     // Return a new function that uses the original locator but remaps certain functions
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
        await page.locator('#form_receiver_address1').fill(address);
        await page.locator('#form_receiver_address2').fill(postCode);
        await page.locator('#form_receiver_address3').fill(adress2);
        await page.getByTestId('form_amount').fill(price);
        await page.getByTestId('form_title').fill(transferTitle);
        await page.locator('#uniform-form_is_email span').click();
        await page.locator('#form_email').fill(email);
        await page.locator('#uniform-form_add_receiver span').click();
        await page.locator('#form_trusted').check();
        await page.locator('#execute_btn').click();
        await page.getByTestId('close-button').click();
        //Assert
        await expect(page.getByTestId('message-text')).toHaveText(message);
    });
});
