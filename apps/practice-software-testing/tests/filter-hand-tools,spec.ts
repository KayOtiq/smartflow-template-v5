import { test } from '../pages/pageManager';
import { expect } from '@playwright/test';

test.describe('Hand Tools - Filter Pliers and View Pliers', () => {
  test('should filter pliers and add to cart', async ({ pm }) => {
    await test.step('add pliers to cart', async () => {
      await pm.onHandToolsPage().navigateTo('https://practicesoftwaretesting.com');
      await pm.onHandToolsPage().pliersLink.click();
      await pm.onProductPage().addToCartButton.click();
    });

    await test.step('verify cart increment and toaster', async () => {
      await expect(pm.onProductPage().toastMessage).toBeVisible();
      await expect(pm.onProductPage().toastMessage).toContainText(/Product added to shopping/i);
      await expect(pm.onProductPage().cartCount).toHaveText('1');
    });
  });
});
