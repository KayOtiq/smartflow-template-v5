# Page Object Model & PageManager Pattern

This project uses the Page Object Model (POM) and a PageManager fixture for scalable, maintainable Playwright tests.

## Page Object Model (POM)
- Each page or major UI component is represented by a class in `/pages/`.
- Page classes encapsulate locators and actions for that page/component.
- All page objects extend `BasePage` for shared navigation/utilities.

## PageManager Fixture
- Each app has a `PageManager` class in `/pages/pageManager.ts`.
- The `PageManager` provides access to all page objects via methods like `onHomePage()`, `onProductPage()`, etc.
- Tests use a custom `test` fixture that injects a `pm` (PageManager) instance into each test for easy access.

**Example usage:**
```typescript
import { test } from '../pages/pageManager';
import { expect } from '@playwright/test';

test('user journey', async ({ pm }) => {
  await pm.onHomePage().navigateTo('/');
  await pm.onProductPage().addToCart('pliers');
});
```
## Benefits

- **Consistancy:** All page object usage goes throught he `PageManager`
 -**Encapsulation:** Page objects expose only necessary actions; locators are private
- **Scalability:** Easy to add new pages/components and update tests
- **Test Clarity:** Test focus on user journeys, not setup/boilderplaate

## Rationale: Encapsulated Locator Pattern vs. Playwright Standard

This project uses a pattern where locators are private and only exposed through high-level page object methods, rather than public fields as shown in the [Playwright docs](https://playwright.dev/docs/pom).

**Why this pattern?**
- **Encapsulation:** Locators are private, so only page object methods interact with them. Tests use high-level actions, not raw locators.
- **Abstraction:** Test code is decoupled from selectors, making refactoring easier and tests less brittle.
- **Centralized Initialization:** All locators are initialized in the constructor or an `initializeLocators` method, making updates easy.
- **Cleaner Tests:** Tests read like user journeys and focus on intent, not implementation details.
- **Scalability:** As the suite grows, encapsulation and clear APIs make onboarding and maintenance easier.

## Usage Example: Encapsulated Locator Pattern

**Page Object (Encapsulated):**
```typescript
// pages/productPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductPage extends BasePage {
  private addToCartButton: Locator;
  private toastMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
    this.toastMessage = page.locator('.toast-message, .toaster, [role="status"]');
  }

  async addToCart(productName: string) {
    await this.addToCartButton.click();
  }

  async isToastVisible() {
    return this.toastMessage.isVisible();
  }
}
```

**Test (using PageManager fixture):**
```typescript
import { test } from '../pages/pageManager';
import { expect } from '@playwright/test';

test('add to cart shows toast', async ({ pm }) => {
  await pm.onProductPage().addToCart('pliers');
  await expect(pm.onProductPage().isToastVisible()).resolves.toBe(true);
});
```

## Comparison: Playwright Standard Pattern

```typescript
// Playwright docs example
export class ProductPage {
  readonly addToCartButton: Locator;
  constructor(page: Page) {
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
  }
}

// Test
await productPage.addToCartButton.click();
```

**Key difference:** In this pattern, tests never access locators directly—only through page object methods. This enforces abstraction and makes tests more robust and maintainable.

## How to Add a New Page Object
1. Create a new class in `/pages/`, extending `BasePage`.
2. Add a method to `PageManager` to access the new page.
3. Use the new page object in your tests via the `pm` fixture.

---
For more details, see the main README and `.github/copilot-instructions.md`.
