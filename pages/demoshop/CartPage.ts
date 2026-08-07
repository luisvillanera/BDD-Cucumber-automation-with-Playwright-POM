import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly pageTitle: Locator;
  readonly cartRows: Locator;
  readonly emptyCartMessage: Locator;
  readonly updateCartButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly termsOfServiceCheckbox: Locator;
  readonly checkoutButton: Locator;
  readonly subTotal: Locator;
  readonly removeCheckboxes: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.page-title h1');
    this.cartRows = page.locator('.cart-item-row');
    this.emptyCartMessage = page.getByText(/Your Shopping Cart is empty!/i);
    this.updateCartButton = page.getByRole('button', { name: 'Update shopping cart' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue shopping' });
    this.termsOfServiceCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');
    this.subTotal = page.locator('.cart-total .product-price').last();
    this.removeCheckboxes = page.locator('input[name="removefromcart"]');
  }

  async open(): Promise<void> {
    await this.goto('/cart');
    await expect(this.pageTitle).toHaveText('Shopping cart');
  }

  rowByProductName(name: string | RegExp): Locator {
    return this.cartRows.filter({ hasText: name });
  }

  async expectProductInCart(name: string | RegExp): Promise<void> {
    await expect(this.rowByProductName(name)).toBeVisible();
  }

  async removeProduct(name: string | RegExp): Promise<void> {
    await this.rowByProductName(name).locator('input[name="removefromcart"]').check();
    await this.updateCartButton.click();
  }

  async expectEmpty(): Promise<void> {
    await expect(this.emptyCartMessage).toBeVisible();
  }

  async getCartQtyFromHeader(): Promise<string> {
    return (await this.cartLink.locator('.cart-qty').innerText()).trim();
  }
}
