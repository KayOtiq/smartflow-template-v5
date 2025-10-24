import { test } from '../pages/pageManager';
import { expect } from '@playwright/test';

test('should mock 3rd party API with Playwright page.route', async ({ page }) => {
  await page.route('https://api.thirdparty.com/user/123', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ id: '123', name: 'Mocked User', email: 'mocked@example.com' }),
    });
  });

  // Simulate a fetch to the mocked endpoint
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
