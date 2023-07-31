import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.components';

export class Payment {
    constructor(private page: Page) {}

    sideMenu = new SideMenuComponent(this.page);
    loginInput = this.page.getByTestId('login-input');
    passwordInput = this.page.getByTestId('password-input');
    loginBtn = this.page.getByTestId('login-button');
    transferReciver = this.page.getByTestId('transfer_receiver');
    formAccountTo = this.page.getByTestId('form_account_to');
    toogleBtn = this.page.locator('.i-show').first();
    addressLocator(nrAddress: number) {
        return this.page.locator(`#form_receiver_address${nrAddress}`);
    }
    formAmount = this.page.getByTestId('form_amount');
    formTitle = this.page.getByTestId('form_title');
    uniformEmail = this.page.locator('#uniform-form_is_email span');
    formEmail = this.page.locator('#form_email');
    formReciver = this.page.locator('#uniform-form_add_receiver span');
    formTrusted = this.page.locator('#form_trusted');
    exectuteBtn = this.page.locator('#execute_btn');
    closeBtn = this.page.getByTestId('close-button');
    messageText = this.page.getByTestId('message-text');
    async sendPayment(
        transferReciver: string,
        accountNumber: string,
        price: string,
        transferTitle: string,
        email: string
    ): Promise<void> {
        await this.transferReciver.fill(transferReciver);
        await this.formAccountTo.fill(accountNumber);
        await this.formAmount.fill(price);
        await this.formTitle.fill(transferTitle);
        await this.uniformEmail.click();
        await this.formEmail.fill(email);
        await this.formReciver.click();
        await this.formTrusted.check();
        await this.exectuteBtn.click();
        await this.closeBtn.click();
    }
}
