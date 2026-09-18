import { test, expect, APIResponse } from '@playwright/test';

test.describe('API Security - Error Information Disclosure', () => {

  test('[BAS-16a] 404 error does not leak stack traces or internal paths', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const endpoint: string = '/products/99999';
    const sensitivePatterns: RegExp[] = [
      /stack/i, /trace/i, /node_modules/i, /at\s+\w+\s+\(/i,
      /\.js:\d+/i, /internal\//i, /usr\/local/i, /home\//i
    ];

    // 🎬 THE WORK (Actions)
    const response: APIResponse = await request.get(`${BASE_URL}${endpoint}`);
    const rawBody: string = await response.text();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).toBe(404);

    for (const pattern of sensitivePatterns) {
      expect(rawBody).not.toMatch(pattern);
    }
  });

  test('[BAS-16b] Malformed JSON body does not expose server internals', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const endpoint: string = '/auth/login';
    const malformedBody: string = '{invalid json%%%';
    const sensitivePatterns: RegExp[] = [
      /stack/i, /SyntaxError/i, /node_modules/i,
      /at\s+\w+\s+\(/i, /\.js:\d+/i
    ];

    // 🎬 THE WORK (Actions)
    const response: APIResponse = await request.post(`${BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      data: malformedBody,
    });
    const rawBody: string = await response.text();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).not.toBe(200);

    for (const pattern of sensitivePatterns) {
      expect(rawBody).not.toMatch(pattern);
    }
  });

  test('[BAS-16c] Invalid endpoint does not reveal API routing framework', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const endpoint: string = '/../../etc/passwd';
    const sensitivePatterns: RegExp[] = [
      /root:/i, /express/i, /fastify/i, /koa/i,
      /cannot\s+GET/i, /node_modules/i
    ];

    // 🎬 THE WORK (Actions)
    const response: APIResponse = await request.get(`${BASE_URL}${endpoint}`);
    const rawBody: string = await response.text();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).not.toBe(200);

    for (const pattern of sensitivePatterns) {
      expect(rawBody).not.toMatch(pattern);
    }
  });

});
