import { test, expect } from '@playwright/test'

//to invastingationß
test.describe('Desktop tests', () => {
    
    test.beforeEach(async ({page}) => {
        const userID = 'testerLO'
        const userPassword = 'password'

        await page.goto('/')
        await page.getByTestId('login-input').fill(userID)
        await page.getByTestId('password-input').fill(userPassword)
        await page.getByTestId('login-button').click()
    })
    test('quick payment with correct data', async ({ page }) => {
        //Arrange
        const receiverID = '2'
        const amoutTransfer = '150'
        const transferTitle = 'pizza'
        const popupClose = '.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.ui-dialog-buttons'
        //Act
        await page.locator('#widget_1_transfer_receiver').selectOption(receiverID)
        await page.locator('#widget_1_transfer_amount').fill(amoutTransfer)
        await page.locator('#widget_1_transfer_title').fill(transferTitle)
        await page.getByRole('button', { name: 'wykonaj' }).click()
        // await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza')
        await expect(page.locator(popupClose)).toHaveCSS('display', 'block')
        await page.getByTestId('close-button').click()
        // await page.waitForTimeout(1);
    })
    test('sucesfull mobile top-up', async ({ page }) => {
        //Arrange
        const phoneNumber = '504 xxx xxx'
        let amountAdded = '40,21';
        const decimalMatch = amountAdded.match(/,\d{2}$/);
        if (!decimalMatch) {
            amountAdded += ',00';
        } else if (decimalMatch[0].length === 2) {
            amountAdded += '00';
        }
        const expectedMessage = `Doładowanie wykonane! ${amountAdded}PLN na numer ${phoneNumber}`;
        //Act
        await page.locator('#widget_1_topup_receiver').selectOption(phoneNumber)
        await page.locator('#widget_1_topup_amount').fill(amountAdded)
        await page.locator('#uniform-widget_1_topup_agreement span').check()
        await page.locator('#execute_phone_btn').click()
        //Assert
        await expect(page.locator('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.ui-dialog-buttons')).toHaveCSS('display', 'block')
        await expect(page.locator('#show_messages')).toHaveText(expectedMessage)
        await page.getByTestId('close-button').click()
    })
})
