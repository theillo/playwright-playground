import { Page } from '@playwright/test';

export class Payment {
    constructor(private page: Page) {}

    loginInput = this.page.getByTestId('login-input');
    passwordInput = this.page.getByTestId('password-input');
    loginBtn = this.page.getByTestId('login-button');
    transferReciver = this.page.getByTestId('transfer_receiver');
    formAccountTo = this.page.getByTestId('form_account_to');
    toogleBtn = this.page.locator(
        '#transfer_new_out > div.form-fields > div:nth-child(4) > div.grid-20.mt-hide.ms-hide.form-static > span'
    );
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
}
