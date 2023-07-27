import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('login tests cases', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        loginPage = new LoginPage(page);
    });
    test('login with correct credentials', async ({ page }) => {
        //Arrange
        const userId = loginData.userId;
        const userPassword = loginData.userPassword;
        const expectedUserName = 'Jan Demobankowy';
        //Act
        await loginPage.login(userId, userPassword);
        //Assert
        await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
    });

    test('login with incorrect username', async ({ page }) => {
        //Arrange
        const incorrectNickname = 'test';
        const expectedErrorMsg = 'identyfikator ma min. 8 znaków';
        //Act
        await loginPage.loginInput.fill(incorrectNickname);
        await loginPage.passwordInput.click();
        //Assert
        await expect(loginPage.loginError).toHaveText(expectedErrorMsg);
    });
    test('login with incorrect password', async ({ page }) => {
        //Arrange
        const userId = loginData.userId;
        const wrongPassword = '32';
        const expectedErrorMsgforPassword = 'hasło ma min. 8 znaków';
        //Act
        await loginPage.loginInput.fill(userId);
        await loginPage.passwordInput.fill(wrongPassword);
        await loginPage.passwordInput.blur(); //remove focus from input

        //Assert
        await expect(loginPage.passwordError).toHaveText(expectedErrorMsgforPassword);
    });
});
// ctrl + shift + R - zrobienie refaktoryzacji
// alt + strzalka przesuniecie lini
