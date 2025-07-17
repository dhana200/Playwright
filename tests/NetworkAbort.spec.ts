import{test, expect} from '@playwright/test';


test.only('Network Abort and Network Logs', async({browser}) => {

    // Launch the browser
    const context = await browser.newContext();
    const page = await context.newPage();

    //Username and Password Locators
    const Username = page.locator('#userEmail');
    const Password = page.locator('#userPassword');

    // Intercept network requests and abort CSS files
    await page.route('**/*.css', route => route.abort());

    // Log requests and responses
    page.on('request', request => console.log('Request:', request.url()));
    page.on('response', response => console.log('Response:', response.url(), response.status()));

    // Go to the client page
    await page.goto('https://rahulshettyacademy.com/client/');

    // Enter username and password
    await Username.fill('Ichigoshadow@newmail.com');
    await Password.fill('Qwerty@1234');

    // Click on the login button
    await page.locator('#login').click();
});