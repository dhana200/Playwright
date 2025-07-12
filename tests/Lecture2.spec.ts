import{test, expect} from '@playwright/test';


test('UI Locators', async({browser}) => {

    // Launch the browser
    const context = await browser.newContext();
    const page = await context.newPage();

    // Register Button Locator
    const registerNew = page.locator('//p[contains(text(),"account?")]');

    //Username and Password Locators
    const Username = page.locator('#userEmail');
    const Password = page.locator('#userPassword');

    // Blinking Text Locator
    const BlinkingText = page.locator('.blinkingText');

    // Header Locator
    const HeaderLocator = page.locator('//p[contains(text(),"Welcome to the Career-Focused Software Testing Meetup")]').nth(1);

    // Go to the client page
    await page.goto('https://rahulshettyacademy.com/client/');

    // Click on the Register button
    await registerNew.click();

    // Print state of the radio button
    console.log(await page.locator('//input[@value="Male"]').isChecked());

    // Check the radio button is unchecked
    expect(await page.locator('//input[@value="Male"]').isChecked()).toBeFalsy();

    // Click on the radio button
    await page.locator('//input[@value="Male"]').click();

    // Print state of the radio button
    console.log(await page.locator('//input[@value="Male"]').isChecked());

    // Check the radio button is checked
    expect(await page.locator('//input[@value="Male"]').isChecked()).toBeTruthy();

    // Return back to the previous page
    await page.goBack();

    // Enter username and password
    await Username.fill('Ichigoshadow@newmail.com');
    await Password.fill('Qwerty@1234');

    // Click on the login button
    await page.locator('#login').click();

    // Check the title of the page
    await expect(page).toHaveTitle("Let's Shop");

    // Click on the blinking text to navigate to the next page
    const [newPage] = await Promise.all([ context.waitForEvent('page'), BlinkingText.click() ]);

    // Print the title of the new page
    console.log(' New Page Title: ', await newPage.title());

    // Check Header Locator attribute
    await expect(HeaderLocator).toHaveAttribute('class', "hero_heading");

    // Wait for the page after execution
    await newPage.pause();

});