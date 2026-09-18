import { test, expect } from '@playwright/test';
import { SecureBankLoginPage } from '../../pages/SecureBankLoginPage';

test.describe('SecureBank Login - Input Validation', () => {

  // 🏗️ THE PLAN (Shared Variables)
  let loginPage: SecureBankLoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new SecureBankLoginPage(page);
    await loginPage.goto();
  });

  test('Invalid credentials show error message', async () => {
    // 🏗️ THE PLAN (Test-specific data)
    const invalidUsername: string = 'wronguser';
    const invalidPassword: string = 'wrongpass123';

    // 🎬 THE WORK (Actions)
    await loginPage.login(invalidUsername, invalidPassword);

    // ✅ THE CHECK (Assertions)
    await expect(loginPage.errorMessage).toBeVisible({ timeout: 5000 });
    await expect(loginPage.errorMessage).toContainText(/invalid|incorrect|wrong|error/i);
  });

  test('Empty username field prevents login', async ({ page }) => {
    // 🏗️ THE PLAN (Test-specific data)
    const emptyUsername: string = '';
    const validPassword: string = 'bank_sauce';

    // 🎬 THE WORK (Actions)
    await loginPage.login(emptyUsername, validPassword);

    // ✅ THE CHECK (Assertions)
    await expect(page).not.toHaveURL(/\/dashboard/i);
  });

  test('Empty password field prevents login', async ({ page }) => {
    // 🏗️ THE PLAN (Test-specific data)
    const validUsername: string = 'standard_user';
    const emptyPassword: string = '';

    // 🎬 THE WORK (Actions)
    await loginPage.login(validUsername, emptyPassword);

    // ✅ THE CHECK (Assertions)
    await expect(page).not.toHaveURL(/\/dashboard/i);
  });

});
