import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/demoshop.fixture';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

Given('the user opens the home page', async ({ homePage }) => {
  await homePage.open();
});

Then('the page title should contain {string}', async ({ homePage }, titleText: string) => {
  await expect(homePage.page).toHaveTitle(new RegExp(titleText));
});

Then('featured products should be displayed', async ({ homePage }) => {
  await expect(homePage.featuredProducts.first()).toBeVisible();
  await expect(homePage.featuredProducts).toHaveCount(await homePage.featuredProducts.count());
});

When('the user selects category {string} from top menu', async ({ homePage }, category: string) => {
  await homePage.openCategory(category);
});

Then('the page title heading should be {string}', async ({ catalogPage }, heading: string) => {
  await expect(catalogPage.pageTitle).toHaveText(heading);
});

Then('product items should be visible in the catalog', async ({ catalogPage }) => {
  await expect(catalogPage.productItems.first()).toBeVisible();
});

Then('Register link should be visible in the header', async ({ homePage }) => {
  await expect(homePage.registerLink).toBeVisible();
});

Then('Log in link should be visible in the header', async ({ homePage }) => {
  await expect(homePage.loginLink).toBeVisible();
});

Then('Shopping cart link should be visible in the header', async ({ homePage }) => {
  await expect(homePage.cartLink).toBeVisible();
});
