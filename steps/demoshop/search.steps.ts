import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/demoshop.fixture';
import { expect } from '@playwright/test';
import { DEMO_PRODUCTS } from '../../data/demoshop';

const { Given, When, Then } = createBdd(test);

Given('the user is on the home page for search', async ({ homePage }) => {
  await homePage.open();
});

When('the user searches for matching product term {string}', async ({ homePage }, term: string) => {
  await homePage.search(term || DEMO_PRODUCTS.searchTerm);
});

Then('the search results page should be displayed', async ({ catalogPage }) => {
  await expect(catalogPage.page).toHaveURL(/search/);
});

Then('product items should be listed on the search page', async ({ catalogPage }) => {
  await expect(catalogPage.productItems.first()).toBeVisible();
});

Then('a product matching {string} should be visible', async ({ catalogPage }, term: string) => {
  await catalogPage.expectProductVisible(new RegExp(term, 'i'));
});

When('the user searches for non-matching term {string}', async ({ homePage }, term: string) => {
  await homePage.search(term || DEMO_PRODUCTS.emptySearch);
});

Then('no results message should be displayed', async ({ catalogPage }) => {
  await expect(catalogPage.noResultMessage).toBeVisible();
});

Then('search input should be visible', async ({ homePage }) => {
  await expect(homePage.searchInput).toBeVisible();
});

Then('search input should have type attribute {string}', async ({ homePage }, attrValue: string) => {
  await expect(homePage.page.locator('#small-searchterms')).toHaveAttribute('type', attrValue);
});

Then('search button should be enabled', async ({ homePage }) => {
  await expect(homePage.searchButton).toBeEnabled();
});
