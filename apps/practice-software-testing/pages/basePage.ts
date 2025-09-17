/**
 * BasePage provides common navigation and utility methods for all page objects.
 * All app-specific pages should extend this class.
 */

import { Page, Locator } from '@playwright/test';

interface Locators {
  [key: string]: Locator;
}

export class BasePage {
  readonly page: Page;
  readonly locators: Locators;

  constructor(page: Page) {
    this.page = page;
    this.locators = this.initializeLocators(page);
  }

  protected initializeLocators(page: Page): Locators {
    return {};
  }
  // Define common locators here, e.g.:}

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async type(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.page.isVisible(selector);
  }

  async waitForSelector(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }
}
