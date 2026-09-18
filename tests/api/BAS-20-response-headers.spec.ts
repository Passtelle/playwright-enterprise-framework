import { test, expect, APIResponse } from '@playwright/test';

test.describe('API Security - Response Header Audit', () => {

  test('[BAS-20a] Response includes security-relevant headers', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const endpoint: string = '/products/1';

    // 🎬 THE WORK (Actions)
    const response: APIResponse = await request.get(`${BASE_URL}${endpoint}`);
    const headers: Record<string, string> = Object.fromEntries(
      response.headers().entries ? [...response.headers().entries()] :
      Object.entries(response.headers())
    );

    // ✅ THE CHECK (Assertions)
    expect(response.status()).toBe(200);
    expect(headers['content-type']).toMatch(/application\/json/i);
  });

  test('[BAS-20b] Response does not expose server technology details', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const endpoint: string = '/products/1';
    const sensitiveHeaders: string[] = [
      'x-powered-by', 'server', 'x-aspnet-version', 'x-aspnetmvc-version'
    ];

    // 🎬 THE WORK (Actions)
    const response: APIResponse = await request.get(`${BASE_URL}${endpoint}`);
    const headers: Record<string, string> = response.headers();

    // ✅ THE CHECK (Assertions)
    for (const header of sensitiveHeaders) {
      if (headers[header]) {
        expect(headers[header]).not.toMatch(/express/i);
        expect(headers[header]).not.toMatch(/asp\.net/i);
        expect(headers[header]).not.toMatch(/php/i);
        expect(headers[header]).not.toMatch(/apache/i);
      }
    }
  });

  test('[BAS-20c] Error response maintains same content-type as success', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const validEndpoint: string = '/products/1';
    const invalidEndpoint: string = '/products/99999';

    // 🎬 THE WORK (Actions)
    const successResponse: APIResponse = await request.get(`${BASE_URL}${validEndpoint}`);
    const errorResponse: APIResponse = await request.get(`${BASE_URL}${invalidEndpoint}`);

    const successContentType: string = successResponse.headers()['content-type'] ?? '';
    const errorContentType: string = errorResponse.headers()['content-type'] ?? '';

    // ✅ THE CHECK (Assertions)
    expect(successResponse.status()).toBe(200);
    expect(errorResponse.status()).toBe(404);
    expect(successContentType).toMatch(/application\/json/i);
    expect(errorContentType).toMatch(/application\/json/i);
  });

});
