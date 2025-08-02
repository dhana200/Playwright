export class EndPage{

    endMessage :any;
    endCard : any;
    page:any;

    constructor(page:any) {
        this.page = page;
        this.endMessage = page.locator('.hero-primary');
        this.endCard = page.locator('.box label');
    }

    async verifyOrderConfirmationMessage() {
        // Verify the order confirmation message
        return await this.endMessage.textContent();
    }
    

    async getOrderId() {
        let newOrderId: any = await this.endCard.nth(1).textContent();
        newOrderId = newOrderId?.split(' ')[2]?.trim();
        return newOrderId;
    }

    async navigateToOrdersPage() {
        // Navigate to the orders page
        await this.endCard.nth(0).click();
    }
    
}