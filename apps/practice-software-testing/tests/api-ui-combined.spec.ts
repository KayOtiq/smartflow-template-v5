import { test } from './api-fixture';
import { expect } from '@playwright/test';

// This test uses the API fixture to set up data, then validates via the UI

test('should create user via API and verify in UI', async ({ api, page }) => {
  // 1. Create a user via API
  const userPayload = { name: 'UI+API User', email: 'uiapi@example.com' };
  const createRes = await api.post('/user', userPayload);
  expect(createRes.status).toBe(201);
  const userId = createRes.data.id;

  // 2. Navigate to the app and verify the user appears in the UI
  await page.goto('https://practicesoftwaretesting.com/#/users');
  // Example: Replace with your actual UI selector/logic
  await expect(page.locator(`[data-user-id="${userId}"]`)).toBeVisible();
  await expect(page.locator(`[data-user-id="${userId}"] .user-email`)).toHaveText(
    'uiapi@example.com',
  );
});
