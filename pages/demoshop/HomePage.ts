import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly welcomeHeading: Locator;
  readonly featuredProducts: Locator;
  readonly categoryBooks: Locator;
  readonly categoryComputers: Locator;
  readonly categoryElectronics: Locator;
  readonly facebookLink: Locator;
  readonly twitterLink: Locator;
  readonly youtubeLink: Locator;
  readonly contactUsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeHeading = page.getByRole('heading', { name: /Welcome to our store/i });
    this.featuredProducts = page.locator('.product-grid .product-item');
    this.categoryBooks = page.locator('.top-menu').getByRole('link', { name: 'Books', exact: true });
    this.categoryComputers = page.locator('.top-menu').getByRole('link', { name: 'Computers', exact: true });
    this.categoryElectronics = page.locator('.top-menu').getByRole('link', { name: 'Electronics', exact: true });
    this.facebookLink = page.locator('.follow-us .facebook a');
    this.twitterLink = page.locator('.follow-us .twitter a');
    this.youtubeLink = page.locator('.follow-us .youtube a');
    this.contactUsLink = page.getByRole('link', { name: 'Contact us' });
  }

  async open(): Promise<void> {
    await this.openHome();
    await expect(this.welcomeHeading).toBeVisible();
  }

  async openCategory(name: 'Books' | 'Computers' | 'Electronics' | (string & {})): Promise<void> {
    await this.page.locator('.top-menu').getByRole('link', { name, exact: true }).click();
  }

  featuredProductByName(name: string | RegExp): Locator {
    return this.featuredProducts.filter({ hasText: name });
  }
}
