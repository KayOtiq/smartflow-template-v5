import { BasePage } from './basePage';
import { Locator } from '@playwright/test';

export class ProductPage extends BasePage {
  get productImage(): Locator {
    return this.page.getByRole('img', { name: 'Product Image', exact: true });
  }
  get productName(): Locator {
    return this.page.getByRole('heading', { name: 'Product Name' });
  }
  get addToCartButton(): Locator {
    return this.page.getByRole('button', { name: /add to cart/i });
  }
  get toastMessage(): Locator {
    return this.page.locator('.toast-message, .toaster, [role="status"]');
  }
  get cartCount(): Locator {
    return this.page.getByRole('link', { name: 'cart' });
  }
}
