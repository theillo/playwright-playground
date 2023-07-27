import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { Desktop } from '../pages/desktop.page';
import { LoginPage } from '../pages/login.page';

//to invastingationß
test.describe('Desktop tests', () => {
    let desktop: Desktop;

    test.beforeEach(async ({ page }) => {
        desktop = new Desktop(page);
        const loginPage = new LoginPage(page);

        const userID = loginData.userId;
        const userPassword = loginData.userPassword;
        await page.goto('/');

        await loginPage.login(userID, userPassword);
    });
    test('quick payment with correct data', async ({ page }) => {
        //Arrange
        const receiverID = '2';
        const amoutTransfer = '150';
        const transferTitle = 'pizza';
        const popupClose =
            '.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.ui-dialog-buttons';
        const initialBalance = await desktop.moneyValue.innerText();
        const expectedBalance = Number(initialBalance) - Number(amoutTransfer);
        //Act
        await desktop.wigetLocator('receiver').selectOption(receiverID);
        await desktop.wigetLocator('amount').fill(amoutTransfer);
        await desktop.wigetLocator('title').fill(transferTitle);
        await page.getByRole('button', { name: 'wykonaj' }).click();
        // await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza')
        await expect(page.locator(popupClose)).toHaveCSS('display', 'block');
        await page.getByTestId('close-button').click();
        await expect(desktop.moneyValue).toHaveText(`${expectedBalance}`);
    });
    test('sucesfull mobile top-up', async ({ page }) => {
        //Arrange
        const phoneNumber = '504 xxx xxx';
        let amountAdded = '40,21';
        const decimalMatch = amountAdded.match(/,\d{2}$/);
        if (!decimalMatch) {
            amountAdded += ',00';
        } else if (decimalMatch[0].length === 2) {
            amountAdded += '00';
        }
        const expectedMessage = `Doładowanie wykonane! ${amountAdded}PLN na numer ${phoneNumber}`;
        //Act
        await desktop.wigetLocatorTopup('receiver').selectOption(phoneNumber);
        await desktop.wigetLocatorTopup('amount').fill(amountAdded);
        await desktop.uniformWidget.check();
        await desktop.executePhone.click();
        //Assert
        await expect(desktop.toogleBtn).toHaveCSS('display', 'block');
        await expect(desktop.showMessage).toHaveText(expectedMessage);
        await desktop.closeBtn.click();
    });
});
