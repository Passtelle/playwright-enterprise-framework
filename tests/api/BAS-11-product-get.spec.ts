import { test, expect, APIResponse } from '@playwright/test';

interface ProductResponse {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  sku: string;
  tags: string[];
  images: string[];
  thumbnail: string;
}

test.describe('Product Retrieval - Happy Path', () => {

  test('[BAS-11] GET product by ID returns correct product data', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const productId: number = 1;
    const expectedStatus: number = 200;
    const maxResponseTime: number = 2000;

    // 🎬 THE WORK (Actions)
    const startTime: number = Date.now();
    const response: APIResponse = await request.get(`${BASE_URL}/products/${productId}`);
    const responseTime: number = Date.now() - startTime;
    const body: ProductResponse = await response.json();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).toBe(expectedStatus);
    expect(body.id).toBe(productId);
    expect(body.title).toBeTruthy();
    expect(typeof body.title).toBe('string');
    expect(body.price).toBeGreaterThan(0);
    expect(typeof body.price).toBe('number');
    expect(body.category).toBeTruthy();
    expect(body.rating).toBeGreaterThanOrEqual(0);
    expect(body.rating).toBeLessThanOrEqual(5);
    expect(body.stock).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(body.images)).toBe(true);
    expect(body.thumbnail).toBeTruthy();
    expect(responseTime).toBeLessThan(maxResponseTime);
  });

  test('[BAS-11b] GET non-existent product returns 404', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const invalidProductId: number = 99999;
    const expectedStatus: number = 404;
    const expectedMessage: RegExp = /not found/i;
    const maxResponseTime: number = 2000;

    // 🎬 THE WORK (Actions)
    const startTime: number = Date.now();
    const response: APIResponse = await request.get(`${BASE_URL}/products/${invalidProductId}`);
    const responseTime: number = Date.now() - startTime;
    const body: { message: string } = await response.json();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).toBe(expectedStatus);
    expect(body.message).toMatch(expectedMessage);
    expect(responseTime).toBeLessThan(maxResponseTime);
  });

});
