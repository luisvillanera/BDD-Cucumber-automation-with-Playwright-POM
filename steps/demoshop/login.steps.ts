import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/demoshop.fixture';
import { expect } from '@playwright/test';
import { DEMO_USERS } from '../../data/demoshop';

const { Given, When, Then } = createBdd(test);

let currentUser: ReturnType<typeof DEMO_USERS.newUser>;

Given('a new user navigates to the registration page', async ({ registerPage }) => {
  currentUser = DEMO_USERS.newUser();
  await registerPage.open();
});

When('the user completes registration and logs out', async ({ registerPage, loginPage }) => {
  await registerPage.register(currentUser);
  await registerPage.expectRegistrationCompleted();
  await loginPage.logout();
  await expect(loginPage.loginLink).toBeVisible();
});

When('the user logs in with the registered credentials', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login(currentUser.email, currentUser.password);
});

Then('the user should be logged in successfully as the registered email', async ({ loginPage }) => {
  await loginPage.expectLoggedInAs(currentUser.email);
});

Then('the current URL should be the home page', async ({ homePage }) => {
  await expect(homePage.page).toHaveURL(/demowebshop\.tricentis\.com\/?$/);
});

Given('the user is on the login page', async ({ loginPage }) => {
  await loginPage.open();
});

When('the user attempts to log in with invalid credentials', async ({ loginPage }) => {
  await loginPage.login(DEMO_USERS.invalid.email, DEMO_USERS.invalid.password);
});

Then('the user should stay on the login page', async ({ loginPage }) => {
  await expect(loginPage.page).toHaveURL(/\/login/);
});

Then('a login error message should be displayed', async ({ loginPage }) => {
  await loginPage.expectLoginError(/Login was unsuccessful|No customer account found|credentials/i);
});

When('the user submits the login form with empty fields', async ({ loginPage }) => {
  await loginPage.loginButton.click();
});
