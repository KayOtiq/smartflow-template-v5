import { test } from '../../../pages/pageManager';
import { expect } from '@playwright/test';

// MSW-based mocking removed. Use Playwright's page.route for API mocking instead.
test.describe('API Mocking with Playwright', () => {
  //replace the URL with an actual endpoint you want to mock
  test.skip('should mock 3rd party API with page.route', async ({ page }) => {
    await page.route('https://api.thirdparty.com/user/123', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: '123',
          name: 'Mocked User',
          email: 'mocked@example.com',
        }),
      });
    });

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
