import { test, expect, APIResponse } from '@playwright/test';

test.describe('API Reliability - Idempotency', () => {

  test('[BAS-18a] Repeated PUT requests return identical results', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const endpoint: string = '/products/1';
    const updatePayload = { title: 'Idempotency Test Product' };
    const repeatCount: number = 3;

    // 🎬 THE WORK (Actions)
    const responses: APIResponse[] = [];
    for (let i = 0; i < repeatCount; i++) {
      const response: APIResponse = await request.put(`${BASE_URL}${endpoint}`, {
        data: updatePayload,
      });
      responses.push(response);
    }

    // ✅ THE CHECK (Assertions)
    const bodies = [];
    for (const response of responses) {
      expect(response.status()).toBe(200);
      bodies.push(await response.json());
    }

    for (const body of bodies) {
      expect(body.id).toBe(1);
      expect(body.title).toBe(updatePayload.title);
    }
  });

  test('[BAS-18b] Repeated DELETE requests return consistent status', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const endpoint: string = '/products/1';
    const repeatCount: number = 3;

    // 🎬 THE WORK (Actions)
    const statuses: number[] = [];
    for (let i = 0; i < repeatCount; i++) {
      const response: APIResponse = await request.delete(`${BASE_URL}${endpoint}`);
      statuses.push(response.status());
    }

    // ✅ THE CHECK (Assertions)
    for (const status of statuses) {
      expect(status).toBe(200);
    }
  });

  test('[BAS-18c] Repeated GET requests return identical response body', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const endpoint: string = '/products/1';
    const repeatCount: number = 5;

    // 🎬 THE WORK (Actions)
    const bodies: string[] = [];
    for (let i = 0; i < repeatCount; i++) {
      const response: APIResponse = await request.get(`${BASE_URL}${endpoint}`);
      expect(response.status()).toBe(200);
      bodies.push(await response.text());
    }

    // ✅ THE CHECK (Assertions)
    const firstBody: string = bodies[0];
    for (let i = 1; i < bodies.length; i++) {
      expect(bodies[i]).toBe(firstBody);
    }
  });

});
