import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/demoshop.fixture';
import { expect } from '@playwright/test';
import { DEMO_PRODUCTS } from '../../data/demoshop';

const { Given, When, Then } = createBdd(test);

Given('the user navigates to the laptop details page', async ({ productPage }) => {
  await productPage.openBySlug(DEMO_PRODUCTS.laptop.slug);
  await productPage.expectProductTitle(DEMO_PRODUCTS.laptop.name);
});

When('the user adds the product to the cart', async ({ productPage }) => {
  await productPage.addToCart();
});

When('the user opens the shopping cart page', async ({ cartPage }) => {
  await cartPage.open();
});

Then('the laptop should be visible in the cart', async ({ cartPage }) => {
  await cartPage.expectProductInCart(DEMO_PRODUCTS.laptop.name);
});

Then('the cart should contain {int} item', async ({ cartPage }, count: number) => {
  await expect(cartPage.cartRows).toHaveCount(count);
});

Given('the user opens the Books category page', async ({ catalogPage }) => {
  await catalogPage.openBooks();
  await catalogPage.expectProductVisible(DEMO_PRODUCTS.book.name);
});

When('the user adds the first simple product to the cart from the catalog', async ({ catalogPage }) => {
  await catalogPage.addFirstSimpleProductToCart();
});

Then('a notification bar should confirm item added to cart', async ({ catalogPage }) => {
  await catalogPage.expectBarNotification(/added to your shopping cart/i);
});

Then('the shopping cart should display at least 1 item', async ({ cartPage }) => {
  await expect(cartPage.cartRows.first()).toBeVisible();
});

Then('the shopping cart should be empty', async ({ cartPage }) => {
  await cartPage.expectEmpty();
});

When('the user removes the product from the cart', async ({ cartPage }) => {
  await cartPage.removeProduct(DEMO_PRODUCTS.laptop.name);
});
