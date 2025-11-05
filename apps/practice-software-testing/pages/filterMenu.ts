import { BasePage } from './basePage';
import { Locator } from '@playwright/test';

export class FiltersMenu extends BasePage {
  get handToolsFilter(): Locator {
    return this.page.locator('#filters').getByText('Hand Tools');
  }

  get pliersFilter(): Locator {
    return this.page
      .locator('div')
      .filter({ hasText: 'Pliers' })
      .nth(4)
      .and(this.page.locator('[data-test="category-01K89VNYQN7WPVME6RD0PKFR7D"]'));
  }
}
