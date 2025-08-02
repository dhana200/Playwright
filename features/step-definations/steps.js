import {POManger} from '../../jspageObjects/POManger.js';
import {Given, When, Then, After} from '@cucumber/cucumber';
import {expect} from '@playwright/test';
import playwright from 'playwright';
import userDetails from '../../dataSource/userDetails.json' with { type: 'json' };

// Hook to close browser after each scenario
After(async function() {
    if (this.page) {
        const browser = this.page.context().browser();
        await this.page.close();
        if (browser) {
            await browser.close();
        }
    }
});

Given('the user logs in with his credentials username {string} and password {string}', {timeout: 60000}, async function (username, password) { 
    const browser = await playwright.chromium.launch({headless: false});
    this.page = await browser.newPage();
    // Create an instance of the POManger class
    this.pom = new POManger(this.page);

    // Get the login page instance from the POManger
    this.loginPage = await this.pom.getLoginPage();

    // Go to the client page
    await this.loginPage.goto();

    // Perform a valid login
    await this.loginPage.ValidLogin(username, password);
    //Check if Logged in successfully
    await expect(this.page).toHaveTitle("Let's Shop");

});

When('the user adds product {string} to the cart', {timeout: 30000}, async function (cardTitle) {

    // Navigate to the dashboard page
    this.dashboardPage = await this.pom.getDashboardPage();

    // Navigate to the card with the specified title
    // and add it to the cart
    await this.dashboardPage.navigateToCard(cardTitle);

    // Verify if the card is added to the cart
    await this.dashboardPage.goToCart();
});

Then('the cart should contain the product {string}', async function (cardTitle) {
    // Create an instance of the CartPage class
    // and pass the page object to it
    // Verify if correct item is added to the cart
    this.cartPage = await this.pom.getCartPage();
    let cartItemTitle = await this.cartPage.getCartItemTitle();

    // Check if the cart item title contains the expected card title
    expect(cartItemTitle).toContain(cardTitle);
});

 When('the user checks out the product', {timeout: 30000}, async function () {

    // Log the order ID
    await this.page.waitForLoadState('networkidle');

    //Click on the checkout button
    await this.cartPage.clickCheckoutButton();

    // and pass the page object to it
    this.checkOutPage = await this.pom.getCheckOutPage();
    const DetailsCount = await this.checkOutPage.getCountOfDetails();

    for (let i = 0; i < DetailsCount; i++) {
        // Fill in the details based on the index
        await this.checkOutPage.fillDetailInput(i, userDetails);
    }

    // Select the expiry date and month from the dropdowns
    await this.checkOutPage.selectExpiryDate(userDetails);
    await this.checkOutPage.selectExpiryMonth(userDetails);

    // Click on the apply button for the coupon code
    await this.checkOutPage.clickApplyButton();

    // expect(await page.locator('.field.small p').textContent()).toContain('* Invalid Coupon');

    // Fill address location and choose from the dropdown
    await this.checkOutPage.setLocation(userDetails);

    // Place the order
    await this.checkOutPage.placeOrder();

});

Then('the user should see a confirmation message', async function () {
    // Create an instance of the EndPage class
    // and pass the page object to it
    this.endPage = await this.pom.getEndPage();

    // Verify the order confirmation message
    expect(await this.endPage.verifyOrderConfirmationMessage()).toContain(' Thankyou for the order. ');
});