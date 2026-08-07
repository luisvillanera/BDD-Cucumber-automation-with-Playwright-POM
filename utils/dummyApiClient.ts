import { APIRequestContext, APIResponse, expect, test } from '@playwright/test';
import { jsonHeaders } from '../data/dummyRestApi';

/**
 * Client helpers for https://dummy.restapiexample.com
 * That public API rate-limits aggressively (HTTP 429).
 */
export async function apiRequest(
  request: APIRequestContext,
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  options: { data?: unknown; headers?: Record<string, string> } = {},
  retries = 4,
): Promise<APIResponse> {
  let lastResponse: APIResponse | undefined;

  for (let attempt = 0; attempt <= retries; attempt++) {
    lastResponse = await request[method](url, {
      headers: { ...jsonHeaders, ...options.headers },
      data: options.data,
      timeout: 20_000,
    });

    if (lastResponse.status() !== 429) {
      return lastResponse;
    }

    await new Promise((resolve) => setTimeout(resolve, 4000 * (attempt + 1)));
  }

  return lastResponse!;
}

export async function expectSuccessJson(response: APIResponse) {
  if (response.status() === 429) {
    test.skip(true, 'dummy.restapiexample.com rate limit (HTTP 429). Re-run later.');
  }

  const text = await response.text();
  expect(response.status(), text).toBe(200);
  const body = JSON.parse(text);
  expect(body.status).toBe('success');
  return body;
}

export async function coolDown(ms = 5000): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
