import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    loginInput = this.page.getByTestId('login-input');
    passwordInput = this.page.getByTestId('password-input');
    loginBtn = this.page.getByTestId('login-button');
    // await .fill(userId);
    // await .fill(userPassword);
    // await .click();
}
