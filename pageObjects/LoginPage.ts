import { expect } from '@playwright/test';
export class LoginPage{

    page: any;
    username: any;
    password: any;
    loginButton: any;

    constructor(page: any) {
        this.page = page;
        this.username = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.loginButton = page.locator('#login');
    }

    async goto()
    {
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }

    async ValidLogin(username: string, password: string)
    {
        // Enter username and password
        await this.username.fill(username);
        await this.password.fill(password);

        // Click on the login button
        await this.loginButton.click();

        // Wait for the page to load completely
        await this.page.waitForLoadState('networkidle');

        // Check if logged in successfully
        await expect(this.page).toHaveTitle("Let's Shop");
    }

}