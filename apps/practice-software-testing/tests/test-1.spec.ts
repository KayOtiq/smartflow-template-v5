import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.locator('[data-test="nav-categories"]').click();
  await page.locator('[data-test="nav-hand-tools"]').click();

  await page.getByRole('checkbox', { name: 'Pliers' }).check();

  await page.getByRole('link', { name: 'Combination Pliers' }).click();
  await expect(page.locator('[data-test="product-name"]')).toContainText('Combination Pliers');
  await page.locator('[data-test="add-to-cart"]').click();
  await expect(page.getByRole('alert', { name: 'Product added to shopping' })).toBeVisible();
  await page.locator('[data-test="nav-home"]').click();
  await expect(page.getByRole('link', { name: 'Practice Software Testing -' })).toBeVisible();

  await page.getByRole('checkbox', { name: 'Pliers' }).check(); //await page.locator('[data-test="product-01K8A2HQQAN9YSZ2JWGFXCCHTB"]').click(); //pliers
  await page.locator('[data-test="product-01K8A5ZKDHHHJ06YRS4WY8NDY9"]').click();
  await expect(page.locator('[data-test="product-name"]')).toContainText('Pliers');
  await page.locator('[data-test="nav-home"]').click();

  await page.getByRole('link', { name: 'Combination Pliers' }).click();
  await expect(page.locator('[data-test="product-name"]')).toContainText('Combination Pliers');
});
