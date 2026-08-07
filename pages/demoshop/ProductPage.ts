import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly addToWishlistButton: Locator;
  readonly addToCompareButton: Locator;
  readonly shortDescription: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.product-name h1');
    this.productPrice = page.locator('.product-price');
    this.quantityInput = page.locator('input.qty-input');
    this.addToCartButton = page.locator('.add-to-cart-button');
    this.addToWishlistButton = page.locator('.add-to-wishlist-button');
    this.addToCompareButton = page.locator('.add-to-compare-list-button');
    this.shortDescription = page.locator('.short-description');
  }

  async openBySlug(slug: string): Promise<void> {
    await this.goto(`/${slug}`);
    await expect(this.productName).toBeVisible();
  }

  async setQuantity(qty: number): Promise<void> {
    await this.quantityInput.fill(String(qty));
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
    await this.expectBarNotification(/The product has been added to your/i);
  }

  async expectProductTitle(name: string | RegExp): Promise<void> {
    await expect(this.productName).toHaveText(name);
  }
}
