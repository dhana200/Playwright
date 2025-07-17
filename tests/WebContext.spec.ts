import{test, expect} from '@playwright/test';

let webContext: any;

test.beforeAll(async({browser}) => {

    // Launch the browser
    const context = await browser.newContext();
    const page = await context.newPage();

    //Username and Password Locators
    const Username = page.locator('#userEmail');
    const Password = page.locator('#userPassword');

    // Go to the client page
    await page.goto('https://rahulshettyacademy.com/client/');

    // Enter username and password
    await Username.fill('Ichigoshadow@newmail.com');
    await Password.fill('Qwerty@1234');

    // Click on the login button
    await page.locator('#login').click();
    
    // wait for the page to load completely
    await page.waitForLoadState('networkidle');

    // store the context state to a file
    // This will save the local storage, cookies, and other session data
    await context.storageState({path: 'state.json'});
});


test('Opening with prerequisites', async({browser}) => {

    webContext = await browser.newContext({
        storageState: 'state.json'
    });   

    const page = await webContext.newPage();

    // Go to the client page
    await page.goto('https://rahulshettyacademy.com/client/');

    // Locators for the product card and the cart
    const Cardbody = page.locator('.card-body');

    //Check if Logged in successfully
    await expect(page).toHaveTitle("Let's Shop");

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');

    // Fetch all the card titles
    const cardsCount = await Cardbody.count();

    
});