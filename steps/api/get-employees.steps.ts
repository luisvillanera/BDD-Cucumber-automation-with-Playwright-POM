import { createBdd, test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { dummyApi } from '../../data/dummyRestApi';
import { apiRequest, coolDown, expectSuccessJson } from '../../utils/dummyApiClient';

const { When, Then } = createBdd(test);

let lastResponseBody: any;

When('sending a GET request to fetching all employees', async ({ request }) => {
  await coolDown();
  const response = await apiRequest(request, 'get', dummyApi.employees);
  lastResponseBody = await expectSuccessJson(response);
});

Then('the response should indicate all records have been fetched successfully', async () => {
  expect(lastResponseBody.message).toBe('Successfully! All records has been fetched.');
});

Then('the response body should contain a non-empty array of employee objects', async () => {
  expect(Array.isArray(lastResponseBody.data)).toBeTruthy();
  expect(lastResponseBody.data.length).toBeGreaterThan(0);
  expect(lastResponseBody.data[0]).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      employee_name: expect.any(String),
      employee_salary: expect.anything(),
      employee_age: expect.anything(),
      profile_image: expect.any(String),
    }),
  );
});

Then('the first employee in the response should have ID {int} and name {string}', async ({ }, expectedId: number, expectedName: string) => {
  expect(lastResponseBody.data[0]).toMatchObject({
    id: expectedId,
    employee_name: expectedName,
  });
});
