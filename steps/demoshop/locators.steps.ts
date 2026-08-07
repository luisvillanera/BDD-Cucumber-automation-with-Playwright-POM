import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/demoshop.fixture';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

Given('the user is on the home page for locator tests', async ({ homePage }) => {
  await homePage.open();
});

Then('the Register link should be accessible by role', async ({ homePage }) => {
  await expect(homePage.page.getByRole('link', { name: 'Register' })).toBeVisible();
});

Then('the Log in link should be accessible by role', async ({ homePage }) => {
  await expect(homePage.page.getByRole('link', { name: 'Log in' })).toBeVisible();
});

Then('the Welcome heading should be accessible by role', async ({ homePage }) => {
  await expect(homePage.page.getByRole('heading', { name: /Welcome to our store/i })).toBeVisible();
});

Given('the user is on the login page for locator tests', async ({ loginPage }) => {
  await loginPage.open();
});

Then('Email input locator by id should be editable', async ({ loginPage }) => {
  await expect(loginPage.page.locator('#Email')).toBeEditable();
});

Then('Password input locator by id should be editable', async ({ loginPage }) => {
  await expect(loginPage.page.locator('#Password')).toBeEditable();
});

Then('Log in button locator by role should be enabled', async ({ loginPage }) => {
  await expect(loginPage.page.getByRole('button', { name: 'Log in' })).toBeEnabled();
});

Given('the user is on the Books catalog page', async ({ catalogPage }) => {
  await catalogPage.openBooks();
});

Then('the product card for {string} should be visible with a valid link', async ({ catalogPage }, productName: string) => {
  const book = catalogPage.productByName(productName);
  await expect(book).toBeVisible();
  await expect(book.getByRole('link').first()).toHaveAttribute('href', /.+/);
});

Then('the cart quantity badge by CSS should contain {string}', async ({ homePage }, expectedText: string) => {
  const qtyByCss = homePage.page.locator('.header-links .cart-qty');
  await expect(qtyByCss).toContainText(expectedText);
});

Then('the cart link by role should contain {string}', async ({ homePage }, expectedText: string) => {
  const qtyByRole = homePage.cartLink;
  await expect(qtyByRole).toContainText(expectedText);
});

Then('the chained laptop product card should be visible and display a price', async ({ homePage }) => {
  const laptop = homePage.featuredProductByName(/14\.1-inch Laptop/i);
  await expect(laptop).toBeVisible();
  await expect(laptop.locator('.prices')).toContainText(/\d/);
});
