import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly enquiryInput: Locator;
  readonly submitButton: Locator;
  readonly resultMessage: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.page-title h1');
    this.nameInput = page.locator('#FullName');
    this.emailInput = page.locator('#Email');
    this.enquiryInput = page.locator('#Enquiry');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.resultMessage = page.locator('.result');
  }

  async open(): Promise<void> {
    await this.goto('/contactus');
    await expect(this.pageTitle).toHaveText('Contact Us');
  }

  async submitEnquiry(name: string, email: string, enquiry: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.enquiryInput.fill(enquiry);
    await this.submitButton.click();
  }

  async expectSuccess(): Promise<void> {
    await expect(this.resultMessage).toContainText(/Your enquiry has been successfully sent/i);
  }
}
