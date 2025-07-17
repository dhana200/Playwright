import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 2*60*1000,
  expect: {
    timeout: 5000,
  },
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace:'retain-on-failure',
  },

  });
