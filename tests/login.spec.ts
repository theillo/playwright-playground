import { test, expect } from '@playwright/test';


test.describe('login tests cases', () => {
  const url = 'https://demo-bank.vercel.app/';
test('login with correct credentials', async ({ page }) => {
    //Arrange
    const userId = 'test1234';
    const userPassword = 'test1234';
    const expectedUserName = 'Jan Demobankowy';
    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
});

test('login with incorrect username', async ({ page }) => {
  
  const incorrectNickname = 'test';
  const expectedErrorMsg = 'identyfikator ma min. 8 znaków';

    await page.goto(url);
    // await page.getByTestId("login-input").click();
    await page.getByTestId('login-input').fill(incorrectNickname);
    await page.getByTestId('password-input').click();
    await expect(page.getByTestId('error-login-id')).toHaveText(expectedErrorMsg);
});
test('login with incorrect password', async ({ page }) => {
  
  const userId = '123testz';
  const wrongPassword = '32';
    await page.goto(url);
    const expectedErrorMsgforPassword = 'hasło ma min. 8 znaków';
    // await page.getByTestId("login-input").click();
    await page.getByTestId('login-input').fill(userId);
    // await page.getByTestId("password-input").click();
    await page.getByTestId('password-input').fill(wrongPassword);
    // await page.locator('#login_password_container label').click();
    await page.getByTestId('password-input').blur();
    await expect(page.getByTestId('error-login-password')).toHaveText(expectedErrorMsgforPassword);
});
})
// ctrl + shift + R - zrobienie refaktoryzacji
// alt + strzalka przesuniecie lini
