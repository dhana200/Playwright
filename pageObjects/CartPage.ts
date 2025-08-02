export class CartPage {
    cardLocator : any;
    orderIdLocator : any;
    checkoutButtonLocator : any;
    page: any;

    constructor(page: any) {
        this.page = page;
        this.cardLocator = this.page.locator('.cartSection h3');
        this.orderIdLocator = this.page.locator('.cartSection .itemNumber');
        this.checkoutButtonLocator = this.page.locator('.totalRow button[type="button"]');
    }

    async getCartItemTitle() {
        return await this.cardLocator.textContent();
    }

    async getOrderId() {
        let orderIdText = await this.orderIdLocator.textContent();
        return orderIdText?.split(' ')[0]?.split('#')[1]?.trim();
    }

    async clickCheckoutButton() {
        await this.checkoutButtonLocator.click();
    }

}