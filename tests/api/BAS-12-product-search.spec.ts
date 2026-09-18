import { test, expect, APIResponse } from '@playwright/test';

interface ProductSearchResponse {
  products: { id: number; title: string; category: string; price: number }[];
  total: number;
  skip: number;
  limit: number;
}

test.describe('Product Search - Query and Pagination', () => {

  test('[BAS-12] Search products by keyword returns matching results', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const searchTerm: string = 'phone';
    const expectedStatus: number = 200;
    const maxResponseTime: number = 2000;

    // 🎬 THE WORK (Actions)
    const startTime: number = Date.now();
    const response: APIResponse = await request.get(
      `${BASE_URL}/products/search?q=${searchTerm}`
    );
    const responseTime: number = Date.now() - startTime;
    const body: ProductSearchResponse = await response.json();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).toBe(expectedStatus);
    expect(body.total).toBeGreaterThan(0);
    expect(body.products.length).toBeGreaterThan(0);
    expect(typeof body.skip).toBe('number');
    expect(typeof body.limit).toBe('number');
    expect(responseTime).toBeLessThan(maxResponseTime);
  });

  test('[BAS-12b] Search with empty query returns all products', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const searchTerm: string = '';
    const expectedStatus: number = 200;
    const maxResponseTime: number = 2000;

    // 🎬 THE WORK (Actions)
    const startTime: number = Date.now();
    const response: APIResponse = await request.get(
      `${BASE_URL}/products/search?q=${searchTerm}`
    );
    const responseTime: number = Date.now() - startTime;
    const body: ProductSearchResponse = await response.json();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).toBe(expectedStatus);
    expect(body.total).toBeGreaterThan(0);
    expect(body.products.length).toBeGreaterThan(0);
    expect(responseTime).toBeLessThan(maxResponseTime);
  });

  test('[BAS-12c] Pagination with limit and skip returns correct subset', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const limit: number = 5;
    const skip: number = 10;
    const expectedStatus: number = 200;
    const maxResponseTime: number = 2000;

    // 🎬 THE WORK (Actions)
    const startTime: number = Date.now();
    const response: APIResponse = await request.get(
      `${BASE_URL}/products?limit=${limit}&skip=${skip}`
    );
    const responseTime: number = Date.now() - startTime;
    const body: ProductSearchResponse = await response.json();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).toBe(expectedStatus);
    expect(body.products.length).toBe(limit);
    expect(body.skip).toBe(skip);
    expect(body.limit).toBe(limit);
    expect(responseTime).toBeLessThan(maxResponseTime);
  });

});
