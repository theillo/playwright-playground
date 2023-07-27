import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { Payment } from '../pages/payment.page';
import { LoginPage } from '../pages/login.page';
import { Desktop } from '../pages/desktop.page';

test.describe('payment tests', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const desktop = new Desktop(page);

        const userID = loginData.userId;
        const userPassword = loginData.userPassword;
        await page.goto('/');
        await loginPage.login(userID, userPassword);
        await desktop.sideMenu.paymentButton.click();
        // await page.getByRole('link', { name: 'płatności' }).click();
        // await page.locator('#payments_btn').click();
    });
    test('simple payment', async ({ page }) => {
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
        await payment.sendPayment(transferReciver, accountNumber, price, transferTitle, email);
        //Assert
        await expect(payment.messageText).toHaveText(message);
    });
});
