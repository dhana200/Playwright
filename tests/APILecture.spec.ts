import {test, expect, request} from '@playwright/test';

// Importing the APIUtils class from the Utils directory
// This class handles API interactions such as login and order creation
import { APIUtils } from './Utils/APIUtils';

// Initialize response variable to store the order response
let response:any;

// Define the login payload
// This should match the structure expected by the API
let loginpayload = {
    userEmail: 'Ichigoshadow@newmail.com',
    userPassword: 'Qwerty@1234'
};

// Define the order payload
// This should match the structure expected by the API
let orderPayload = {orders:[{country:"Cuba",productOrderedId:"67a8df1ac0d3e6622a297ccb"}]};

test.beforeAll(async () =>{
    
    // Create a new API context for making API requests
    const apiContext = await request.newContext();

    // Initialize APIUtils with the API context and login payload
    const loginUtil = new APIUtils(apiContext, loginpayload);

    // Create an order using the APIUtils instance
    // This will log in and create an order, returning the response
    response = await loginUtil.createOrder(orderPayload);

});

test.only('API Testcase', async ({page}) => {

    // Set the token in local storage for the page context
    // This allows the page to access the token for authenticated requests
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    
    // Go to the client page
    await page.goto('https://rahulshettyacademy.com/client/');
    
    
    //Check if Logged in successfully
    await expect(page).toHaveTitle("Let's Shop");

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');

    // Click on the Orders button to navigate to the orders page
    await page.getByRole('button', {name: '  ORDERS'}).click();

    // Wait for the orders table to be visible
    console.log(await page.locator('.ng-star-inserted th[scope="row"]').first().textContent());

    // Check if the order ID from the response is present in the orders table
    expect(await page.locator('.ng-star-inserted th[scope="row"]').first().textContent()).toContain(response.OrderId);
});
