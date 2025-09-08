import { test } from '../../../pages/pageManager';
import { expect } from '@playwright/test';

// Test: Add Pliers to Cart (no login required)
test.describe('Hand Tools - Add Pliers to Cart', () => {
  test('should add pliers to cart and verify cart increment and toaster', async ({ pm }) => {
    // Navigate to the hand tools page
    await pm
      .onHandToolsPage()
      .navigateTo('https://practicesoftwaretesting.com/#/category/hand-tools');

    // Click on the Pliers product link (update locator if needed)
    await pm.onHandToolsPage().pliersLink.click();

    // Click the 'Add to cart' button on the product page
    await pm.onProductPage().addToCartButton.click();

    // Verify toaster message appears
    await expect(pm.onProductPage().toastMessage).toBeVisible();
    await expect(pm.onProductPage().toastMessage).toContainText(/Product added to shopping/i);

    // Verify cart icon increments by 1 using ProductPage page object
    await expect(pm.onProductPage().cartCount).toHaveText('1');
  });
});
