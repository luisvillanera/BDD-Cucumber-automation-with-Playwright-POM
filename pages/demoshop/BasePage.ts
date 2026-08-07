import { Locator, Page, expect } from '@playwright/test';

export const DEMO_SHOP_URL = 'https://demowebshop.tricentis.com';

/**
 * Base Page Object for Demo Web Shop.
 * Shared navigation, header actions and helpers for all pages.
 */
export class BasePage {
  readonly page: Page;
  readonly baseURL: string;

  // Header / common locators (best practices: role + accessible name when possible)
  readonly registerLink: Locator;
  readonly loginLink: Locator;
  readonly logoutLink: Locator;
  readonly cartLink: Locator;
  readonly wishlistLink: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly accountLink: Locator;
  readonly barNotification: Locator;
  readonly logoLink: Locator;

  constructor(page: Page, baseURL: string = DEMO_SHOP_URL) {
    this.page = page;
    this.baseURL = baseURL.replace(/\/$/, '');

    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
    this.cartLink = page.locator('#topcartlink a.ico-cart');
    this.wishlistLink = page.locator('a.ico-wishlist');
    this.searchInput = page.locator('#small-searchterms');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.accountLink = page.locator('.header-links a.account');
    this.barNotification = page.locator('#bar-notification');
    this.logoLink = page.locator('.header-logo a');
  }

  async goto(path: string = '/'): Promise<void> {
    const url = path.startsWith('http')
      ? path
      : `${this.baseURL}${path.startsWith('/') ? path : `/${path}`}`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async openHome(): Promise<void> {
    await this.goto('/');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  path(): string {
    return new URL(this.page.url()).pathname;
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async goToLogin(): Promise<void> {
    await this.loginLink.click();
  }

  async goToRegister(): Promise<void> {
    await this.registerLink.click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  async expectBarNotification(text: string | RegExp): Promise<void> {
    await expect(this.barNotification).toBeVisible();
    await expect(this.barNotification).toContainText(text);
  }

  async waitForBarNotificationHidden(): Promise<void> {
    await this.barNotification.waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => undefined);
  }

  /**
   * Opens a link that targets a new tab/window and returns the new Page.
   */
  async openInNewTab(link: Locator): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      link.click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }
}
