import { test, expect } from '@playwright/test'

//to invastingationß
test.describe('Desktop tests', () => {
    test('quick payment with correct data', async ({ page }) => {
        //Arrange
        const url = 'https://demo-bank.vercel.app/'
        const userId = 'testerLO'
        const newPassword = 'password'
        const receiverID = '2'
        const amoutTransfer = '150'
        const transferTitle = 'pizza'
        const popupClose =
            '.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.ui-dialog-buttons'
        //Act
        await page.goto(url)
        await page.getByTestId('login-input').fill(userId)
        await page.getByTestId('password-input').fill(newPassword)
        await page.getByTestId('login-button').click()
        await page
            .locator('#widget_1_transfer_receiver')
            .selectOption(receiverID)
        await page.locator('#widget_1_transfer_amount').fill(amoutTransfer)
        await page.locator('#widget_1_transfer_title').fill(transferTitle)
        await page.getByRole('button', { name: 'wykonaj' }).click()
        await expect(page.locator('#show_messages')).toHaveText(
            'Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza'
        )
        await expect(page.locator(popupClose)).toHaveCSS('display', 'block')
        await page.getByTestId('close-button').click()
        // await page.waitForTimeout(1);
    })
    test.only('sucesfull mobile top-up', async ({ page }) => {
        //Arrange
        const url = 'https://demo-bank.vercel.app/'
        const userID = 'test1231'
        const userPassword = 'test1231'
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
        await page.goto(url)
        await page.getByTestId('login-input').fill(userID)
        await page.getByTestId('password-input').fill(userPassword)
        await page.getByTestId('login-button').click()
        await page.locator('#widget_1_topup_receiver').selectOption(phoneNumber)
        await page.locator('#widget_1_topup_amount').fill(amountAdded)
        await page.locator('#uniform-widget_1_topup_agreement span').check()
        await page.locator('#execute_phone_btn').click()
        //Assert
        await expect(
            page.locator(
                '.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.ui-dialog-buttons'
            )
        ).toHaveCSS('display', 'block')
        await expect(page.locator('#show_messages')).toHaveText(expectedMessage)
        await page.getByTestId('close-button').click()
    })
})
