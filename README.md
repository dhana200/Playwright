# Playwright

## Project Overview
This repository contains Playwright-based automation for web UI and API testing, including e-commerce scenarios and timesheet automation.

## Test Flow Instructions

### 1. E-commerce Feature Test (Cucumber)
- **File:** `features/Eccomerce.feature`, `features/step-definations/steps.js`
- **Description:** End-to-end test for buying a product on Rahul Shetty's e-commerce site. It covers login, adding a product to the cart, checking out, and verifying the confirmation message.
- **How to run:**
  ```sh
  npx cucumber-js
  ```
  > Make sure your environment is set up for ES modules and Playwright.

### 2. Timesheet Automation Test
- **File:** `tests/Timesheet.spec.ts`
- **Description:** Automates timesheet entry for a working week (Mon-Fri) using API requests. Logs in, retrieves session token, and submits timesheet data for each weekday. Project: Foodware 365 BC, Organisation: Schouw.
- **How to run:**
  ```sh
  npx playwright test tests/Timesheet.spec.ts
  ```

### 3. UI Locator Demo Test
- **File:** `tests/Lecture2.spec.ts`
- **Description:** Demonstrates Playwright locators and UI interactions, including login and radio button state checks on Rahul Shetty's client site.
- **How to run:**
  ```sh
  npx playwright test tests/Lecture2.spec.ts
  ```

## Test File Descriptions

### Timesheet.spec.ts
Automates timesheet entry for a working week (Monday to Friday) using Playwright API requests. Logs in, retrieves session token, and submits timesheet data for Foodware 365 BC (Schouw) project.

### Lecture2.spec.ts
Demonstrates Playwright UI locator strategies and interactions, including login and radio button state checks on Rahul Shetty's client site.

## Additional Notes
- All page objects are located in the `jspageObjects` folder and are written in JavaScript for compatibility.
- Test data is stored in the `dataSource` folder.
- Ensure you have the required dependencies installed:
  ```sh
  npm install
  ```
- For Allure reporting, use:
  ```sh
  npx playwright show-report
  ```

---