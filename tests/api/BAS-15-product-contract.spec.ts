import { test, expect, APIResponse } from '@playwright/test';

interface ProductResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

test.describe('Product API - Contract/Schema Validation', () => {

  test('[BAS-15a] Product response contains all required fields with correct types', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const endpoint: string = '/products/1';
    const requiredFields: string[] = [
      'id', 'title', 'description', 'price', 'discountPercentage',
      'rating', 'stock', 'brand', 'category', 'thumbnail', 'images'
    ];

    // 🎬 THE WORK (Actions)
    const response: APIResponse = await request.get(`${BASE_URL}${endpoint}`);
    const body: ProductResponse = await response.json();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).toBe(200);

    for (const field of requiredFields) {
      expect(body).toHaveProperty(field);
    }

    expect(typeof body.id).toBe('number');
    expect(typeof body.title).toBe('string');
    expect(typeof body.description).toBe('string');
    expect(typeof body.price).toBe('number');
    expect(typeof body.discountPercentage).toBe('number');
    expect(typeof body.rating).toBe('number');
    expect(typeof body.stock).toBe('number');
    expect(typeof body.category).toBe('string');
    expect(typeof body.thumbnail).toBe('string');
    expect(Array.isArray(body.images)).toBe(true);
  });

  test('[BAS-15b] Product list response enforces pagination contract', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const endpoint: string = '/products?limit=5&skip=0';
    const requiredListFields: string[] = ['products', 'total', 'skip', 'limit'];

    // 🎬 THE WORK (Actions)
    const response: APIResponse = await request.get(`${BASE_URL}${endpoint}`);
    const body = await response.json();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).toBe(200);

    for (const field of requiredListFields) {
      expect(body).toHaveProperty(field);
    }

    expect(typeof body.total).toBe('number');
    expect(typeof body.skip).toBe('number');
    expect(typeof body.limit).toBe('number');
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeLessThanOrEqual(5);
    expect(body.skip).toBe(0);
    expect(body.limit).toBe(5);
  });

  test('[BAS-15c] Product response does not leak internal or unexpected fields', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const endpoint: string = '/products/1';
    const forbiddenFields: string[] = [
      '_id', '__v', 'password', 'secret', 'internal_id',
      'createdBy', 'debug', 'sql', 'query'
    ];

    // 🎬 THE WORK (Actions)
    const response: APIResponse = await request.get(`${BASE_URL}${endpoint}`);
    const body: Record<string, unknown> = await response.json();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).toBe(200);

    for (const field of forbiddenFields) {
      expect(body).not.toHaveProperty(field);
    }
  });

});
