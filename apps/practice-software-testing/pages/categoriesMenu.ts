import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * CategoriesMenu models the left navigation menu for tool categories.
 * Provides locators for each category link.
 */
export class CategoriesMenu extends BasePage {
  get handToolsLink(): Locator {
    return this.page.getByText('Hand Tools');
  }
  get powerToolsLink(): Locator {
    return this.page.getByText('Power Tools');
  }
  get otherToolsLink(): Locator {
    return this.page.getByText('Other');
  }
  get specialToolsLink(): Locator {
    return this.page.getByText('Special Tools');
  }
}
