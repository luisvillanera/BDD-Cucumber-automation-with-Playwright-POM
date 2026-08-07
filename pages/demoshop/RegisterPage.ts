import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export type RegisterData = {
  gender?: 'male' | 'female';
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export class RegisterPage extends BasePage {
  readonly genderMale: Locator;
  readonly genderFemale: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly resultMessage: Locator;
  readonly continueButton: Locator;
  readonly fieldValidation: Locator;

  constructor(page: Page) {
    super(page);
    this.genderMale = page.locator('#gender-male');
    this.genderFemale = page.locator('#gender-female');
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');
    this.resultMessage = page.locator('.result');
    this.continueButton = page.locator('.register-continue-button');
    this.fieldValidation = page.locator('.field-validation-error');
  }

  async open(): Promise<void> {
    await this.goto('/register');
    await expect(pageHeading(this.page)).toBeVisible();
  }

  async fillForm(data: RegisterData): Promise<void> {
    if (data.gender === 'female') {
      await this.genderFemale.check();
    } else {
      await this.genderMale.check();
    }
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.confirmPassword ?? data.password);
  }

  async submit(): Promise<void> {
    await this.registerButton.click();
  }

  async register(data: RegisterData): Promise<void> {
    await this.fillForm(data);
    await this.submit();
  }

  async expectRegistrationCompleted(): Promise<void> {
    await expect(this.page).toHaveURL(/registerresult/);
    await expect(this.resultMessage).toHaveText('Your registration completed');
  }
}

function pageHeading(page: Page): Locator {
  return page.getByRole('heading', { name: 'Register' });
}
