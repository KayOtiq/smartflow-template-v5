import type { Page } from '@playwright/test';
import { test as base } from '@playwright/test';
import { CategoriesMenu } from './categoriesMenu';
import { HomePage } from './homePage';
import { ProductPage } from './productPage';
import { HandToolsPage } from './handToolsPage';

export class PageManager {
  private readonly homePage: HomePage;
  private readonly categoriesMenu: CategoriesMenu;
  private readonly productPage: ProductPage;
  private readonly handToolsPage: HandToolsPage;

  constructor(page: Page, baseUrl?: string) {
    this.homePage = new HomePage(page);
    this.categoriesMenu = new CategoriesMenu(page);
    this.productPage = new ProductPage(page);
    this.handToolsPage = new HandToolsPage(page);
  }

  onHomePage() {
    return this.homePage;
  }
  onCategoriesMenu() {
    return this.categoriesMenu;
  }
  onProductPage() {
    return this.productPage;
  }
  onHandToolsPage() {
    return this.handToolsPage;
  }
}

export const test = base.extend<{ pm: PageManager }>({
  pm: async ({ page }, use) => {
    await use(new PageManager(page));
  },
});
