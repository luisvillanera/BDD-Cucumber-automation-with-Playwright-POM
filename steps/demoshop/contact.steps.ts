import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/demoshop.fixture';
import { expect } from '@playwright/test';
import { uniqueEmail } from '../../data/demoshop';

const { Given, When, Then } = createBdd(test);

Given('the user opens the contact us page', async ({ contactPage }) => {
  await contactPage.open();
});

When('the user submits an enquiry with name, email and message', async ({ contactPage }) => {
  await contactPage.submitEnquiry(
    'Playwright Tester',
    uniqueEmail('contact'),
    'This is an automated enquiry from Playwright POM suite.',
  );
});

Then('a success message should confirm enquiry submission', async ({ contactPage }) => {
  await contactPage.expectSuccess();
});

When('the user clicks the contact submit button without filling fields', async ({ contactPage }) => {
  await contactPage.submitButton.click();
});

Then('the user should remain on the contact us page', async ({ contactPage }) => {
  await expect(contactPage.page).toHaveURL(/contactus/);
});

Then('no success message should be shown', async ({ contactPage }) => {
  await expect(contactPage.resultMessage).toHaveCount(0);
});
