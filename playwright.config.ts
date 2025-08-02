import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 2*60*1000,
  expect: {
    timeout: 1*60*1000,
  },
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace:'on',
  },

  reporter: [['line'], ['allure-playwright']]

  });
