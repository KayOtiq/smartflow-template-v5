import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: { timeout: 10000 },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }], ['allure-playwright']],
  use: {
    baseURL: 'https://practicesoftwaretesting.com',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
});
