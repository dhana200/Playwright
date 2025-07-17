import { test, expect, request } from '@playwright/test';

// Importing the APIUtils class from the Utils directory
// This class handles API interactions such as login and order creation
import { APIUtils } from './Utils/APIUtils';

// Initialize response variable to store the order response
let response: any;

// Define the login payload
// This should match the structure expected by the API
let loginpayload = {
    userEmail: 'Ichigoshadow@newmail.com',
    userPassword: 'Qwerty@1234'
};

// Define the order payload
// This should match the structure expected by the API
let orderPayload = { orders: [{ country: "Cuba", productOrderedId: "67a8df1ac0d3e6622a297ccb" }] };

// Fake response for testing purposes
const fakePayLoadOrders = { data: [], message: "No Orders" };

test.beforeAll(async () => {

    // Create a new API context for making API requests
    const apiContext = await request.newContext();

    // Initialize APIUtils with the API context and login payload
    const loginUtil = new APIUtils(apiContext, loginpayload);

    // Create an order using the APIUtils instance
    // This will log in and create an order, returning the response
    response = await loginUtil.createOrder(orderPayload);

});

test('Network Response Security', async ({ page }) => {

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
    await page.getByRole('button', { name: '  ORDERS' }).click();

    // Intercept the API response to the orders endpoint
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        route => {
            // Intercept the request to the orders API and respond with the fake Response
            route.continue({
                url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'
            });
        }
    );

    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
    console.log(await page.locator('.blink_me').textContent());
});