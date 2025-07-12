import{test, expect} from '@playwright/test';


test('Demo-Assignment', async({browser}) => {

    // Launch the browser
    const context = await browser.newContext();
    const page = await context.newPage();

    // Register Button Locator
    const registerNew = page.locator('//p[contains(text(),"account?")]');

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


});

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/');
  await expect(page.locator('app-login')).toMatchAriaSnapshot(`
    - heading "Practice Website for Rahul Shetty Academy Students" [level=1]:
      - emphasis: Rahul Shetty Academy
    `);
});