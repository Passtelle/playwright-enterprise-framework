import { test, expect, APIResponse } from '@playwright/test';

interface ProductPayload {
  title: string;
  price: number;
  description: string;
  category: string;
}

interface ProductResponse extends ProductPayload {
  id: number;
}

test.describe('API Data - CRUD Lifecycle', () => {

  test('[BAS-19a] CREATE — POST returns new product with generated ID', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const createPayload: ProductPayload = {
      title: 'QA Test Widget',
      price: 49.99,
      description: 'Created by automated CRUD lifecycle test',
      category: 'test-automation',
    };

    // 🎬 THE WORK (Actions)
    const response: APIResponse = await request.post(`${BASE_URL}/products/add`, {
      data: createPayload,
    });
    const body: ProductResponse = await response.json();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).toBe(201);
    expect(body.id).toBeTruthy();
    expect(body.title).toBe(createPayload.title);
    expect(body.price).toBe(createPayload.price);
    expect(body.description).toBe(createPayload.description);
    expect(body.category).toBe(createPayload.category);
  });

  test('[BAS-19b] READ — GET existing product returns full data', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const existingProductId: number = 1;

    // 🎬 THE WORK (Actions)
    const response: APIResponse = await request.get(`${BASE_URL}/products/${existingProductId}`);
    const body: ProductResponse = await response.json();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).toBe(200);
    expect(body.id).toBe(existingProductId);
    expect(body.title).toBeTruthy();
    expect(body.price).toBeGreaterThan(0);
  });

  test('[BAS-19c] UPDATE — PUT modifies product and returns updated data', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const productId: number = 1;
    const updatePayload = { title: 'QA Updated Widget', price: 79.99 };

    // 🎬 THE WORK (Actions)
    const response: APIResponse = await request.put(`${BASE_URL}/products/${productId}`, {
      data: updatePayload,
    });
    const body: ProductResponse = await response.json();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).toBe(200);
    expect(body.id).toBe(productId);
    expect(body.title).toBe(updatePayload.title);
    expect(body.price).toBe(updatePayload.price);
  });

  test('[BAS-19d] DELETE — DELETE returns confirmation with isDeleted flag', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const productId: number = 1;

    // 🎬 THE WORK (Actions)
    const response: APIResponse = await request.delete(`${BASE_URL}/products/${productId}`);
    const body = await response.json();

    // ✅ THE CHECK (Assertions)
    expect(response.status()).toBe(200);
    expect(body.id).toBe(productId);
    expect(body.isDeleted).toBe(true);
  });

});
