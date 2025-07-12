import { test, expect } from '@playwright/test';


test('Search Laptops', async ({page}) => {

    // Using the search bar
    const searchBar = page.locator('//input[@role="searchbox"]');

    // Using the search button
    const searchButton = page.locator('//input[@type="submit"]')

    // Navigate to the page
    await page.goto('https://www.amazon.in/');

    // Get the Page Title
    console.log(await page.title());

    // Assert the Page Title
    expect(await page.title()).toBe('Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in');

    // Search for 'laptop'
    await searchBar.fill('laptop');
    
    // Click on the search button
    await searchButton.click();

    // // Get the First Search Results Title
    // console.log(await page.locator('//div[@data-cy="title-recipe"]').first().textContent());

    // // Get the Last Search Results Title
    // console.log(await page.locator('//div[@data-cy="title-recipe"]').last().textContent());

    // // Wait for the page to load completely
    // await page.waitForLoadState('networkidle');

    // Dynamic wait for the first search result to be visible
    await page.locator('//div[@data-cy="title-recipe"]').first().waitFor();

    // Get all the contents
    console.log(await page.locator('//div[@data-cy="title-recipe"]').allTextContents());
});