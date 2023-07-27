import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    loginInput = this.page.getByTestId('login-input');
    passwordInput = this.page.getByTestId('password-input');
    loginBtn = this.page.getByTestId('login-button');
    loginError = this.page.getByTestId('error-login-id');
    passwordError = this.page.getByTestId('error-login-password');
    async login(userID: string, userPassword: string): Promise<void> {
        await this.loginInput.fill(userID);
        await this.passwordInput.fill(userPassword);
        await this.loginBtn.click();
    }
}
