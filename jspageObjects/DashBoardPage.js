export class DashBoardPage {

    constructor(page) {
        this.page = page;
        this.Cardbody = this.page.locator('.card-body');
        this.cartButton = this.page.locator('button[routerlink="/dashboard/cart"]');
    }

    async navigateToCard(cardTitle) {
        let cardsCount = await this.Cardbody.count();
        let CardPresent = false;

        // Loop through each card and get the title
        for (let i = 0; i < cardsCount; i++) {

            let cardTitlearray = await this.Cardbody.nth(i).textContent();
            let cardTitleLoc = cardTitlearray?.split('$')[0]?.trim();
            // console.log(`Card Title: ${cardTitleLoc}`);

            if (cardTitleLoc === cardTitle) {
                // Click on the card if the title matches
                await this.Cardbody.nth(i).locator('i').nth(1).click();
                console.log(`${cardTitleLoc} has been added to the cart.`);
                CardPresent = true;
                break; // Exit the loop after clicking the card
            }
        }

        if (!CardPresent) {
            console.log(`${cardTitle} is not present in the cart.`);
        }
    }

    async goToCart() {
        await this.cartButton.click();
    }   
}
