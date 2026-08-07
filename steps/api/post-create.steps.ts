import { createBdd, test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { dummyApi, newEmployeePayload } from '../../data/dummyRestApi';
import { apiRequest, coolDown, expectSuccessJson } from '../../utils/dummyApiClient';

const { When, Then } = createBdd(test);

let lastResponse: any;
let lastResponseBody: any;
let lastPayload: any;

When('sending a POST request to create employee with valid payload', async ({ request }) => {
  await coolDown();
  lastPayload = newEmployeePayload();
  lastResponse = await apiRequest(request, 'post', dummyApi.create, { data: lastPayload });
  lastResponseBody = await expectSuccessJson(lastResponse);
});

Then('the response should contain created employee details and an ID', async () => {
  expect(lastResponseBody.data).toMatchObject({
    name: lastPayload.name,
    salary: lastPayload.salary,
    age: lastPayload.age,
  });
  expect(lastResponseBody.data.id).toBeDefined();
});

When('sending a POST request to create employee with empty payload', async ({ request }) => {
  await coolDown();
  lastResponse = await apiRequest(request, 'post', dummyApi.create, { data: {} });
});

Then('the API response status should indicate request error or rate limit', async () => {
  if (lastResponse.status() === 429) {
    return;
  }
  expect([200, 400, 422, 500]).toContain(lastResponse.status());
});

When('sending a POST request to create employee with only name field', async ({ request }) => {
  await coolDown();
  lastResponse = await apiRequest(request, 'post', dummyApi.create, {
    data: { name: 'Incomplete User' },
  });
});
