import { test, expect, APIResponse } from '@playwright/test';

interface ProductResponse {
  id: number;
  title: string;
  price: number;
}

test.describe('API Reliability - Concurrency', () => {

  test('[BAS-17a] 10 simultaneous product requests all return correct data', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const productIds: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expectedStatus: number = 200;

    // 🎬 THE WORK (Actions)
    const responses: APIResponse[] = await Promise.all(
      productIds.map((id: number) => request.get(`${BASE_URL}/products/${id}`))
    );

    // ✅ THE CHECK (Assertions)
    for (let i = 0; i < responses.length; i++) {
      const body: ProductResponse = await responses[i].json();
      expect(responses[i].status()).toBe(expectedStatus);
      expect(body.id).toBe(productIds[i]);
      expect(typeof body.title).toBe('string');
      expect(typeof body.price).toBe('number');
    }
  });

  test('[BAS-17b] Concurrent auth requests do not cross-contaminate tokens', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const users: Array<{ username: string; password: string }> = [
      { username: 'emilys', password: 'emilyspass' },
      { username: 'michaelw', password: 'michaelwpass' },
      { username: 'sophiab', password: 'sophiabpass' },
    ];

    // 🎬 THE WORK (Actions)
    const responses: APIResponse[] = await Promise.all(
      users.map((user) =>
        request.post(`${BASE_URL}/auth/login`, { data: user })
      )
    );

    // ✅ THE CHECK (Assertions)
    const tokens: string[] = [];
    for (let i = 0; i < responses.length; i++) {
      expect(responses[i].status()).toBe(200);
      const body = await responses[i].json();
      expect(body.accessToken).toBeTruthy();
      expect(body.username).toBe(users[i].username);
      tokens.push(body.accessToken);
    }

    const uniqueTokens: number = new Set(tokens).size;
    expect(uniqueTokens).toBe(users.length);
  });

});
