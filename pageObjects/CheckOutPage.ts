export class CheckOutPage {
    detailsLocator: any;
    monthDropDown: any;
    dateDropDown: any;
    applyButton: any;
    locationInput: any;
    selectLocation : any;
    placeOrderButton: any;
    page: any;

    constructor(page: any) {
        this.page = page;
        // Initialize the locator for personal details
        this.detailsLocator = this.page.locator('.form__cc div.title');
        // Select the date and month from the dropdowns
        this.dateDropDown = this.page.locator('.field.small select').nth(0);
        this.monthDropDown = this.page.locator('.field.small select').nth(1);

        //Apply button for the coupon code
        this.applyButton = this.page.locator('.field.small button');

        // Locator for the address input field
        this.locationInput = this.page.locator('.form-group input');

        // Locator for the first location selection button
        this.selectLocation = this.page.locator('.form-group button').first();

        // Checkout button to place the order
        this.placeOrderButton = this.page.locator('.actions a');
    }

    // Method to get the count of personal details fields
    async getCountOfDetails() {
        return await this.detailsLocator.count();
    }


    // Method to fill in the credit card number, name, and CVV
    async setCreditCardNumber(details: any, value: string) {
        await details.locator('+ input').fill(value);
    }

    // Method to fill in the name on the card
    async setCardName(details: any, value: string) {
        await details.locator('+ input').fill(value);
    }

    // Method to fill in the coupon code
    async setCouponCode(details: any, value: string) {
        await details.locator('+ input').fill(value);
    }

    // Method to set the CVV number
    async setCVVNumber(details: any, value: string) {
        await details.locator('+ input').fill(value);
    }

    // method to fill in the details based on the index
    async fillDetailInput(index: number, value: any) {
        let details = this.detailsLocator.nth(index);
        let detailTitle = await details.textContent();

        if (detailTitle?.includes('Credit Card Number ')) {
            // Fill in the credit card number
            await this.setCreditCardNumber(details, value.creditCardNumber);
        }
        else if (detailTitle?.includes('CVV Code ')) {
            // Fill in the CVV code
            await this.setCVVNumber(details, value.cvv);
        }
        else if (detailTitle?.includes('Name on Card ')) {
            // Fill in the CVV code
            await this.setCardName(details, value.nameOnCard);
        }
        else if (detailTitle?.includes('Apply Coupon Code ')) {
            // Fill in the coupon code
            await this.setCouponCode(details, value.cvv);
        }
    }

    async selectExpiryDate(value: any) {
        await this.dateDropDown.selectOption({ label: `${value.expiryDate}` });
    }

    async selectExpiryMonth(value: any) {
        await this.monthDropDown.selectOption({ label: `${value.expiryMonth}` });
    }

    async clickApplyButton() {
        await this.applyButton.click();
    }

    async setLocation(value: any) {
        await this.locationInput.pressSequentially(value.location);
        await this.selectLocation.click();
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }
}