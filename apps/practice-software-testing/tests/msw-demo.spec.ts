// test('should mock 3rd party API with MSW', async ({ page }) => {
// test.describe.skip('MSW Mocking', () => {
import { test } from '../../../pages/pageManager';
import { expect } from '@playwright/test';

const MSW_CDN = 'https://unpkg.com/msw@1.2.3/lib/browser.js'; // Use the latest version as needed

// This test demonstrates how to inject MSW from CDN and your mocks into the browser context for Playwright
test.describe.skip('MSW Mocking', () => {
  test('should mock 3rd party API with MSW', async ({ page }) => {
    // Inject MSW from CDN before any page loads
    await page.addInitScript({
      content: `
        if (!window.msw) {
          const script = document.createElement('script');
          script.src = '${MSW_CDN}';
          script.onload = () => { window.mswLoaded = true; };
          document.head.appendChild(script);
        }
      `,
    });

    // Inject your bundled browser.js mocks after MSW is loaded
    await page.addInitScript({ path: require.resolve('../mocks/browser.js') });

    // Wait for MSW to be loaded
    await page.waitForFunction(() => window.mswLoaded === true);

    // Start the MSW worker in the browser context
    await page.evaluate(async () => {
      // @ts-ignore
      if (window.worker) {
        await window.worker.start();
      }
    });

    // Now, any fetch/XHR to a mocked endpoint will be intercepted by MSW
    const response = await page.evaluate(async () => {
      const res = await fetch('https://api.thirdparty.com/user/123');
      return res.json();
    });

    expect(response).toEqual({
      id: '123',
      name: 'Mocked User',
      email: 'mocked@example.com',
    });
  });
});
