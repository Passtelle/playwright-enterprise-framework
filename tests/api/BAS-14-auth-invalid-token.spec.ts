import { test, expect, APIResponse } from '@playwright/test';

interface ErrorResponse {
  message: string;
}

test.describe('User Authentication - Token Validation', () => {

  test('[BAS-14] Invalid Bearer token is rejected by protected endpoint', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const endpoint: string = '/auth/me';
    const fakeToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.invalid';
    const acceptableStatuses: number[] = [401, 403, 500];
    const expectedMessage: RegExp = /invalid|expired|token|error/i;
    const maxResponseTime: number = 2000;

    // 🎬 THE WORK (Actions)
    const startTime: number = Date.now();
    const response: APIResponse = await request.get(`${BASE_URL}${endpoint}`, {
      headers: { Authorization: `Bearer ${fakeToken}` },
    });
    const responseTime: number = Date.now() - startTime;
    const body: ErrorResponse = await response.json();

    // ✅ THE CHECK (Assertions)
    // DummyJSON returns 500 for malformed JWTs — a real API would return 401
    expect(acceptableStatuses).toContain(response.status());
    expect(response.status()).not.toBe(200);
    expect(body.message).toMatch(expectedMessage);
    expect(responseTime).toBeLessThan(maxResponseTime);
  });

  test('[BAS-14b] Malformed Authorization header returns 401', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const endpoint: string = '/auth/me';
    const malformedHeader: string = 'NotBearer some-random-string';
    const expectedStatus: number = 401;
    const maxResponseTime: number = 2000;

    // 🎬 THE WORK (Actions)
    const startTime: number = Date.now();
    const response: APIResponse = await request.get(`${BASE_URL}${endpoint}`, {
      headers: { Authorization: malformedHeader },
    });
    const responseTime: number = Date.now() - startTime;
    const body: ErrorResponse = await response.json();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).toBe(expectedStatus);
    expect(body.message).toBeTruthy();
    expect(responseTime).toBeLessThan(maxResponseTime);
  });

});
