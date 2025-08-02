import { test, expect } from '@playwright/test';
import {POManger} from '../pageObjects/POManger.ts';
import users from '../dataSource/users.json';

let userDetails = { 
    creditCardNumber: '4111111111111111',
    cvv: '123',
    nameOnCard: 'Ichigo Kurosaki',
    couponCode: 'COUPON123',
    expiryDate: '08',
    expiryMonth: '27',
    location: 'Ameri'
};

test('@POM Testcase 1', async ({ browser }) => {

    // Launch the browser
    const context = await browser.newContext();
    const page = await context.newPage();
    // Create an instance of the POManger class
    const pom = new POManger(page);

    ////// LOGIN PAGE //////

    // Get the login page instance from the POManger
    const loginPage = await pom.getLoginPage();

    // Go to the client page
    await loginPage.goto();

    // Perform a valid login
    await loginPage.ValidLogin(users.username, users.password);
    //Check if Logged in successfully
    await expect(page).toHaveTitle("Let's Shop");

    ////// LOGIN PAGE //////
    
    ////// LIST PAGE //////

    // Navigate to the dashboard page
    const dashboardPage = await pom.getDashboardPage();
    let cardTitle = users.cardTitle;

    // Navigate to the card with the specified title
    // and add it to the cart
    await dashboardPage.navigateToCard(cardTitle);

    // Verify if the card is added to the cart
    await dashboardPage.goToCart();

    ////// LIST PAGE //////

    ////// CART PAGE //////

    // Create an instance of the CartPage class
    // and pass the page object to it
    // Verify if correct item is added to the cart
    const cartPage = await pom.getCartPage();
    let cartItemTitle = await cartPage.getCartItemTitle();

    // Check if the cart item title contains the expected card title
    expect(cartItemTitle).toContain(cardTitle);

    // Log the order ID
    await page.waitForLoadState('networkidle');
    let OrderId: any = await cartPage.getOrderId();
    console.log(`Order ID: ${OrderId} for ${cardTitle}`);

    //Click on the checkout button
    await cartPage.clickCheckoutButton();

    ////// CART PAGE //////

    ////// CHECKOUT PAGE //////

    // Create an instance of the CheckOutPage class
    // and pass the page object to it
    const checkOutPage = await pom.getCheckOutPage();
    const DetailsCount = await checkOutPage.getCountOfDetails();

    for (let i = 0; i < DetailsCount; i++) {
        // Fill in the details based on the index
        await checkOutPage.fillDetailInput(i, userDetails); 
    }

    // Select the expiry date and month from the dropdowns
    await checkOutPage.selectExpiryDate(userDetails);
    await checkOutPage.selectExpiryMonth(userDetails);

    // Click on the apply button for the coupon code
    await checkOutPage.clickApplyButton();

    // expect(await page.locator('.field.small p').textContent()).toContain('* Invalid Coupon');

    // Fill address location and choose from the dropdown
    await checkOutPage.setLocation(userDetails);

    // Place the order
    await checkOutPage.placeOrder();

    ////// CHECKOUT PAGE //////
    
    ////// ORDER END PAGE //////
    
    // Create an instance of the EndPage class
    // and pass the page object to it
    const endPage = await pom.getEndPage();

    // Verify the order confirmation message
    expect(await endPage.verifyOrderConfirmationMessage()).toContain(' Thankyou for the order. ');
    
    // Verify the order ID in the confirmation message
    let newOrderId: any = await endPage.getOrderId();
    console.log(`New Order ID: ${newOrderId} for ${cardTitle}`);
    
    //Navigate to the orders page
    await endPage.navigateToOrdersPage();
    
    ////// ORDER END PAGE //////

    ////// ORDER CART PAGE //////

    let firstCartItemId = await page.locator('.ng-star-inserted th[scope="row"]').first().textContent();
    console.log(`First Cart Item ID: ${firstCartItemId}`);
    expect(firstCartItemId).toContain(newOrderId);

    ////// ORDER CART PAGE //////
});