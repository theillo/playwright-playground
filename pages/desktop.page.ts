import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.components';

export class Desktop {
    constructor(private page: Page) {}

    sideMenu = new SideMenuComponent(this.page);
    moneyValue = this.page.locator('#money_value');
    wigetLocator(wigetType: string) {
        return this.page.locator(`#widget_1_transfer_${wigetType}`);
    }
    wigetLocatorTopup(widgetType: string) {
        return this.page.locator(`#widget_1_topup_${widgetType}`);
    }
    uniformWidget = this.page.locator('#uniform-widget_1_topup_agreement span');
    executePhone = this.page.locator('#execute_phone_btn');
    toogleBtn = this.page.locator(
        '.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.ui-dialog-buttons'
    );
    showMessage = this.page.locator('#show_messages');
    closeBtn = this.page.getByTestId('close-button');

    async executeMobileTopUp(phoneNumber: string, amountAdded: string): Promise<void> {
        await this.wigetLocatorTopup('receiver').selectOption(phoneNumber);
        await this.wigetLocatorTopup('amount').fill(amountAdded);
        await this.uniformWidget.check();
        await this.executePhone.click();
    }
    async quickPayment(
        receiverID: string,
        amoutTransfer: string,
        transferTitle: string
    ): Promise<void> {
        await this.wigetLocator('receiver').selectOption(receiverID);
        await this.wigetLocator('amount').fill(amoutTransfer);
        await this.wigetLocator('title').fill(transferTitle);
        await this.page.getByRole('button', { name: 'wykonaj' }).click();
        await this.page.getByTestId('close-button').click();
    }
}
