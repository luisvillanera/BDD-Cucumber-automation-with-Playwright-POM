import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly loginButton: Locator;
  readonly validationSummary: Locator;
  readonly returningCustomerHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.rememberMeCheckbox = page.locator('#RememberMe');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.validationSummary = page.locator('.validation-summary-errors');
    this.returningCustomerHeading = page.getByRole('heading', { name: 'Welcome, Please Sign In!' });
  }

  async open(): Promise<void> {
    await this.goto('/login');
    await expect(this.returningCustomerHeading).toBeVisible();
  }

  async login(email: string, password: string, rememberMe = false): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }
    await this.loginButton.click();
  }

  async expectLoginError(message?: string | RegExp): Promise<void> {
    await expect(this.validationSummary).toBeVisible();
    if (message) {
      await expect(this.validationSummary).toContainText(message);
    }
  }

  async expectLoggedInAs(email: string): Promise<void> {
    await expect(this.accountLink).toHaveText(email);
    await expect(this.logoutLink).toBeVisible();
  }
}
