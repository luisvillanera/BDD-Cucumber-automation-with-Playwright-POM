import { createBdd, test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { dummyApi } from '../../data/dummyRestApi';
import { apiRequest, coolDown } from '../../utils/dummyApiClient';

const { When, Then } = createBdd(test);

let lastResponse: any;
let lastResponseBody: any;

When('sending a GET request for employee ID {int}', async ({ request }, id: number) => {
  await coolDown();
  lastResponse = await apiRequest(request, 'get', dummyApi.employee(id));
  if (lastResponse.status() === 200) {
    lastResponseBody = await lastResponse.json();
  }
});

Then('the response should indicate employee record was fetched', async () => {
  expect(lastResponseBody.message).toMatch(/Record has been fetched/i);
});

Then('the employee details should match ID {int} and name {string}', async ({ }, id: number, name: string) => {
  expect(lastResponseBody.data).toMatchObject({
    id,
    employee_name: name,
  });
});

Then('the employee details should contain ID {int} and valid name string', async ({ }, id: number) => {
  expect(lastResponseBody.data).toMatchObject({
    id,
    employee_name: expect.any(String),
  });
});

Then('the response status should be handling non-existing employee ID', async () => {
  if (lastResponse.status() === 429) {
    return; // Rate limit
  }
  expect([200, 404]).toContain(lastResponse.status());
  if (lastResponse.status() === 200) {
    expect(lastResponseBody).toHaveProperty('status');
  }
});
