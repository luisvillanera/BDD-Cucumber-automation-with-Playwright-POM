import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CatalogPage extends BasePage {
  readonly pageTitle: Locator;
  readonly productItems: Locator;
  readonly sortBySelect: Locator;
  readonly displaySelect: Locator;
  readonly noResultMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.page-title h1');
    this.productItems = page.locator('.product-grid .product-item, .product-list .product-item');
    this.sortBySelect = page.locator('#products-orderby');
    this.displaySelect = page.locator('#products-pagesize');
    this.noResultMessage = page.getByText(/No products were found/i);
  }

  async openBooks(): Promise<void> {
    await this.goto('/books');
    await expect(this.pageTitle).toHaveText('Books');
  }

  async openComputers(): Promise<void> {
    await this.goto('/computers');
  }

  async openDesktops(): Promise<void> {
    await this.goto('/desktops');
  }

  productByName(name: string | RegExp): Locator {
    return this.productItems.filter({
      has: this.page.locator('.product-title').getByRole('link', {
        name,
        exact: typeof name === 'string',
      }),
    });
  }

  async openProduct(name: string | RegExp): Promise<void> {
    await this.productByName(name).getByRole('link').first().click();
  }

  async addFirstSimpleProductToCart(): Promise<void> {
    const firstAdd = this.productItems.first().locator('input[value="Add to cart"]');
    await firstAdd.click();
  }

  async expectProductVisible(name: string | RegExp): Promise<void> {
    await expect(this.productByName(name)).toBeVisible();
  }

  async sortBy(optionLabel: string): Promise<void> {
    await this.sortBySelect.selectOption({ label: optionLabel });
  }
}
