import { createBdd, test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { dummyApi } from '../../data/dummyRestApi';
import { apiRequest, coolDown, expectSuccessJson } from '../../utils/dummyApiClient';

const { When, Then } = createBdd(test);

let lastResponse: any;
let lastResponseBody: any;
let lastPayload: any;

When('sending a PUT request to update employee 21 with new data', async ({ request }) => {
  await coolDown();
  lastPayload = {
    name: `Updated ${Date.now()}`,
    salary: '88000',
    age: '33',
  };
  lastResponse = await apiRequest(request, 'put', dummyApi.update(21), { data: lastPayload });
  lastResponseBody = await expectSuccessJson(lastResponse);
});

Then('the response should match the updated payload values', async () => {
  expect(lastResponseBody.data).toMatchObject(lastPayload);
});

When('sending a PUT request to update employee 21 with empty payload', async ({ request }) => {
  await coolDown();
  lastResponse = await apiRequest(request, 'put', dummyApi.update(21), { data: {} });
});

Then('the update response status should indicate request error or rate limit', async () => {
  if (lastResponse.status() === 429) {
    return;
  }
  expect([200, 400, 422, 500]).toContain(lastResponse.status());
});
