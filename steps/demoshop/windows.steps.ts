import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/demoshop.fixture';
import { expect } from '@playwright/test';
import { Page } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

let activeNewPage: Page | null = null;

Given('the user is on the home page for tab testing', async ({ homePage }) => {
  await homePage.open();
});

When('the user clicks the Facebook link opening in a new tab', async ({ homePage }) => {
  activeNewPage = await homePage.openInNewTab(homePage.facebookLink);
});

Then('a new tab should open pointing to Facebook', async ({ context }) => {
  expect(context.pages().length).toBeGreaterThanOrEqual(2);
  await expect(activeNewPage!).toHaveURL(/facebook\.com|fb\.com/i);
});

Then('closing the tab returns to Demo Web Shop', async ({ homePage }) => {
  if (activeNewPage) {
    await activeNewPage.close();
    activeNewPage = null;
  }
  await expect(homePage.page).toHaveURL(/demowebshop\.tricentis\.com/);
});

When('the user clicks the Twitter link opening in a new tab', async ({ homePage }) => {
  activeNewPage = await homePage.openInNewTab(homePage.twitterLink);
});

Then('a new tab should open pointing to Twitter or X', async () => {
  await expect(activeNewPage!).toHaveURL(/twitter\.com|x\.com/i);
  if (activeNewPage) {
    await activeNewPage.close();
    activeNewPage = null;
  }
});

When('the user clicks the YouTube link opening in a new tab', async ({ homePage }) => {
  activeNewPage = await homePage.openInNewTab(homePage.youtubeLink);
});

Then('a new tab should open pointing to YouTube', async () => {
  await expect(activeNewPage!).toHaveURL(/youtube\.com/i);
});

Then('the original page should remain on Demo Web Shop with welcome heading', async ({ homePage, page }) => {
  await expect(page).toHaveURL(/demowebshop\.tricentis\.com/);
  await expect(homePage.welcomeHeading).toBeVisible();
  if (activeNewPage) {
    await activeNewPage.close();
    activeNewPage = null;
  }
});

When('the user clicks the Facebook link listening for popup event', async ({ homePage, page }) => {
  const popupPromise = page.waitForEvent('popup');
  await homePage.facebookLink.click();
  activeNewPage = await popupPromise;
});

Then('the popup url should match Facebook domain', async () => {
  await activeNewPage!.waitForLoadState('domcontentloaded');
  expect(activeNewPage!.url()).toMatch(/facebook|fb\.com/i);
  if (activeNewPage) {
    await activeNewPage.close();
    activeNewPage = null;
  }
});
