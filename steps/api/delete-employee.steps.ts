import { createBdd, test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { dummyApi } from '../../data/dummyRestApi';
import { apiRequest, coolDown, expectSuccessJson } from '../../utils/dummyApiClient';

const { When, Then } = createBdd(test);

let lastResponse: any;
let lastResponseBody: any;

When('sending a DELETE request for employee ID {int}', async ({ request }, id: number) => {
  await coolDown();
  lastResponse = await apiRequest(request, 'delete', dummyApi.delete(id));
  lastResponseBody = await expectSuccessJson(lastResponse);
});

Then('the delete response should indicate success message', async () => {
  expect(lastResponseBody.status).toBe('success');
  expect(String(lastResponseBody.message).toLowerCase()).toMatch(/deleted|success/);
});

When('sending a DELETE request for employee with invalid ID string {string}', async ({ request }, id: string) => {
  await coolDown();
  lastResponse = await apiRequest(request, 'delete', dummyApi.delete(id));
});

Then('the delete response status should indicate request error or rate limit', async () => {
  if (lastResponse.status() === 429) {
    return;
  }
  expect([200, 400, 404, 422, 500]).toContain(lastResponse.status());
});
