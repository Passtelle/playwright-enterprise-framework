import { test, expect, APIResponse } from '@playwright/test';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

test.describe('User Authentication - Token Refresh', () => {

  test('[BAS-13] Refresh token returns new access and refresh tokens', async ({ request }) => {

    // 🏗️ THE PLAN (Data & Variables)
    const BASE_URL: string = 'https://dummyjson.com';
    const loginEndpoint: string = '/auth/login';
    const refreshEndpoint: string = '/auth/refresh';
    const credentials: { username: string; password: string } = {
      username: 'emilys',
      password: 'emilyspass',
    };
    const maxResponseTime: number = 2000;

    // 🎬 THE WORK (Actions) — Step 1: Login to get tokens
    const loginResponse: APIResponse = await request.post(`${BASE_URL}${loginEndpoint}`, {
      data: credentials,
    });
    const loginBody: LoginResponse = await loginResponse.json();
    const originalAccessToken: string = loginBody.accessToken;
    const originalRefreshToken: string = loginBody.refreshToken;

    // 🎬 THE WORK (Actions) — Step 2: Refresh the token
    const startTime: number = Date.now();
    const refreshResponse: APIResponse = await request.post(`${BASE_URL}${refreshEndpoint}`, {
      data: { refreshToken: originalRefreshToken, expiresInMins: 1 },
    });
    const responseTime: number = Date.now() - startTime;
    const refreshBody: RefreshResponse = await refreshResponse.json();

    // ✅ THE CHECK (Assertions)
    expect(refreshResponse.status()).toBe(200);
    expect(refreshBody.accessToken).toBeTruthy();
    expect(typeof refreshBody.accessToken).toBe('string');
    expect(refreshBody.refreshToken).toBeTruthy();
    expect(typeof refreshBody.refreshToken).toBe('string');
    expect(refreshBody.accessToken).not.toBe(originalAccessToken);
    expect(responseTime).toBeLessThan(maxResponseTime);
  });

});
