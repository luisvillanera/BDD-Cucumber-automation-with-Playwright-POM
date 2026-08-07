import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/demoshop.fixture';
import { expect } from '@playwright/test';
import { DEMO_USERS } from '../../data/demoshop';

const { Given, When, Then } = createBdd(test);

Given('the user is on the registration page', async ({ registerPage }) => {
  await registerPage.open();
});

When('the user submits valid details for a new unique user', async ({ registerPage }) => {
  const user = DEMO_USERS.newUser();
  await registerPage.register(user);
});

Then('registration should be completed successfully', async ({ registerPage }) => {
  await registerPage.expectRegistrationCompleted();
});

Then('the user should see the logout link in the header', async ({ loginPage }) => {
  await expect(loginPage.logoutLink).toBeVisible();
});

When('the user submits the registration form without filling required fields', async ({ registerPage }) => {
  await registerPage.submit();
});

Then('the user should remain on the registration page', async ({ registerPage }) => {
  await expect(registerPage.page).toHaveURL(/\/register/);
});

Then('field validation errors should be displayed', async ({ registerPage }) => {
  await expect(registerPage.fieldValidation.first()).toBeVisible();
});

When('the user fills the registration form with mismatched passwords', async ({ registerPage }) => {
  const user = DEMO_USERS.newUser();
  await registerPage.fillForm({
    ...user,
    confirmPassword: 'DifferentPass99!',
  });
});

When('the user submits the registration form', async ({ registerPage }) => {
  await registerPage.submit();
});

Then('a password mismatch validation error should be displayed', async ({ registerPage }) => {
  await expect(registerPage.page.getByText(/password.*do not match|The password and confirmation/i)).toBeVisible();
});
