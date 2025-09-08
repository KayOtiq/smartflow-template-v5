import type { Page } from '@playwright/test';
import { test as base } from '@playwright/test';
import { CategoriesMenu } from './categoriesMenu';
import { HomePage } from './homePage';
import { ProductPage } from './productPage';
import { HandToolsPage } from './handToolsPage';
// import { SettingsPage } from './SettingsPage';
// import { FormPage } from './FormPage';

export class PageManager {
   private readonly homePage: HomePage;
   private readonly categoriesMenu: CategoriesMenu;
   private readonly productPage: ProductPage;
   private readonly handToolsPage: HandToolsPage;
//   private readonly formPage: FormPage;

  constructor(page: Page, baseUrl?: string) {
     this.homePage = new HomePage(page);
     this.categoriesMenu = new CategoriesMenu(page);
     this.productPage = new ProductPage(page);
     this.handToolsPage = new HandToolsPage(page);
    // this.formPage = new FormPage(page, baseUrl);
  }

   onHomePage() { return this.homePage; }
   onCategoriesMenu() { return this.categoriesMenu; }
   onProductPage() { return this.productPage; }
   onHandToolsPage() { return this.handToolsPage; }
//   onFormPage() { return this.formPage; }
}

type Fixtures = { pm: PageManager };
const test = base.extend<Fixtures>({
  pm: async ({ page, baseURL }, use) => {
    const pm = new PageManager(page, baseURL);
    await use(pm);
  }
});
export { test };
