import { BasePage } from './basePage';
import { Locator } from '@playwright/test';

export class HomePage extends BasePage {
  get logo(): Locator {
    return this.page.locator('img[alt="Practice Software Testing"]');
  }
  get homeLink(): Locator {
    return this.page.getByRole('link', { name: 'Home' });
  }
  get aboutLink(): Locator {
    return this.page.getByRole('link', { name: 'About' });
  }
  get contactLink(): Locator {
    return this.page.getByRole('link', { name: 'Contact' });
  }
  get welcomeMessage(): Locator {
    return this.page.getByText('Welcome to the Practice Software Testing site!');
  }
  get learnMoreButton(): Locator {
    return this.page.getByRole('link', { name: 'Learn More' });
  }
}
