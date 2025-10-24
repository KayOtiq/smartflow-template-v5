// ...existing code from original handToolsPage.ts...
import { BasePage } from './basePage';
import { Locator, Page } from '@playwright/test';

/**
 * HandToolsPage models the hand tools listing page.
 * Provides locators for key hand tool links and headers.
 */
export class HandToolsPage extends BasePage {
  get handToolsHeader(): Locator {
    return this.page.getByRole('heading', { name: 'Hand Tools' });
  }
  get combinationPliersLink(): Locator {
    return this.page.getByRole('link', { name: 'Combination Pliers' });
    //return this.page.locator('[data-test="product-01K8A2HQQ4ZC1FSEZ0JVVWWR2Z"]')
  }
  get boldCuttersLink(): Locator {
    return this.page.getByRole('link', { name: 'Bolt Cutters' });
    //return this.page.locator('[data-test=product-01K8A2HQQEN34HAZE8ZD0X5PZ3"]')
  }
  get pliersLink(): Locator {
    //return this.page.getByRole('link', { name: 'Pliers $12.01' });
    //return this.page.locator('[data-test="product-01K8A2HQQAN9YSZ2JWGFXCCHTB"]')
    return this.page.locator('[data-test="product-01K8A5ZKDHHHJ06YRS4WY8NDY9"]');
  }
  // Add more locators as getters as needed
}
