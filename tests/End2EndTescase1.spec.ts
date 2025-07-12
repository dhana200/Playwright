import {test, expect} from '@playwright/test';
import { Console } from 'console';

test('Testcase 1', async({browser}) => {

    // Launch the browser
    const context = await browser.newContext();
    const page = await context.newPage();

    
    ////// LOGIN PAGE //////
    
    
    //Username and Password Locators
    const Username = page.locator('#userEmail');
    const Password = page.locator('#userPassword');
    const Cardbody = page.locator('.card-body');
    
    // Go to the client page
    await page.goto('https://rahulshettyacademy.com/client/');
    
    // Enter username and password
    await Username.fill('Ichigoshadow@newmail.com');
    await Password.fill('Qwerty@1234');

    // Click on the login button
    await page.locator('#login').click();

    ////// LOGIN PAGE //////


    ////// LIST PAGE //////

    //Check if Logged in successfully
    await expect(page).toHaveTitle("Let's Shop");

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');

    // Fetch all the card titles
    const cardsCount = await Cardbody.count();

    // Initialize an array to store card titles
    const cardTitle = 'ADIDAS ORIGINAL';
    let CardPresent = false;

    // Loop through each card and get the title
    for (let i = 0; i < cardsCount; i++) {

        let cardTitlearray = await Cardbody.nth(i).textContent();
        let cardTitleLoc = cardTitlearray?.split('$')[0]?.trim();
        // console.log(`Card Title: ${cardTitleLoc}`);

        if (cardTitleLoc === cardTitle) {
            // Click on the card if the title matches
            await Cardbody.nth(i).locator('i').nth(1).click();
            console.log(`${cardTitleLoc} has been added to the cart.`);
            CardPresent = true;
            break; // Exit the loop after clicking the card
        }
    }

    if (!CardPresent) {
        console.log(`${cardTitle} is not present in the cart.`);
    }

    ////// LIST PAGE //////


    ////// CART PAGE //////

    // Go to the cart page
    const cartButton = page.locator('button[routerlink="/dashboard/cart"]');
    await cartButton.click();
    
    // Verify if correct item is added to the cart
    console.log(await page.locator('.cartSection h3').textContent());
    expect(await page.locator('.cartSection h3').textContent()).toContain(cardTitle);
    
    // Log the order ID
    await page.waitForLoadState('networkidle');
    let OrderId :any = await page.locator('.cartSection .itemNumber').textContent();
    OrderId = OrderId?.split(' ')[0]?.split('#')[1]?.trim();
    console.log(`Order ID: ${OrderId} for ${cardTitle}`);

    //Click on the checkout button
    await page.locator('.totalRow button[type="button"]').click();

    ////// CART PAGE //////


    ////// CHECKOUT PAGE //////

    const PersonalDetails = page.locator('.form__cc div.title');
    const DetailsCount = await PersonalDetails.count();

    for( let i = 0; i < DetailsCount; i++) {

        let details = await PersonalDetails.nth(i);
        let detailTitle = await details.textContent();

        if (detailTitle?.includes('Credit Card Number ')) {
            // Fill in the credit card number
            await details.locator('+ input').fill('4111111111111111');
        }
        else if (detailTitle?.includes('CVV Code ')) {
            // Fill in the CVV code
            await details.locator('+ input').fill('123');
        }
        else if (detailTitle?.includes('Name on Card ')) {
            // Fill in the CVV code
            await details.locator('+ input').fill('Ichigo Kurosaki');
        }
        else if (detailTitle?.includes('Apply Coupon Code ')) {
            // Fill in the coupon code
            await details.locator('+ input').fill('COUPON123');
        }
    }

    // Select the date and month from the dropdowns
    const MonthDropDown = page.locator('.field.small select').nth(0);
    const DateDropDown = page.locator('.field.small select').nth(1);
    
    await DateDropDown.selectOption({ label: '27' });
    await MonthDropDown.selectOption({ label: '08' });
    
    // Click on the apply button for the coupon code
    const ApplyButton = page.locator('.field.small button');
    await ApplyButton.click();

    // expect(await page.locator('.field.small p').textContent()).toContain('* Invalid Coupon');

    // Fill address location and choose from the dropdown
    await page.locator('.form-group input').pressSequentially('ameri');
    await page.locator('.form-group button').first().click();

    // Place the order
    await page.locator('.actions a').click();

    ////// CHECKOUT PAGE //////

    ////// ORDER END PAGE //////

    // Verify the order confirmation message
    expect(await page.locator('.hero-primary').textContent()).toContain(' Thankyou for the order. ');

    // Verify the order ID in the confirmation message
    let newOrderId : any = await page.locator('.box label').nth(1).textContent();
    newOrderId = newOrderId?.split(' ')[2]?.trim();
    console.log(`New Order ID: ${newOrderId} for ${cardTitle}`);

    //Navigate to the orders page
    await page.locator('.box label').nth(0).click();

    ////// ORDER END PAGE //////

    ////// ORDER CART PAGE //////

    console.log(await page.locator('.ng-star-inserted th[scope="row"]').first().textContent());
    // expect()

    ////// ORDER CART PAGE //////

    await page.pause();
});