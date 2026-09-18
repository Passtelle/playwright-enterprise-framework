import { test, expect } from '@playwright/test';
import { SecureBankLoginPage } from '../../pages/SecureBankLoginPage';
import { SecureBankDashboardPage } from '../../pages/SecureBankDashboardPage';

test.describe('SecureBank Dashboard - State Verification', () => {

  // 🏗️ THE PLAN (Shared Variables)
  let loginPage: SecureBankLoginPage;
  let dashboardPage: SecureBankDashboardPage;
  const username: string = 'standard_user';
  const password: string = 'bank_sauce';

  test.beforeEach(async ({ page }) => {
    loginPage = new SecureBankLoginPage(page);
    dashboardPage = new SecureBankDashboardPage(page);
    await loginPage.goto();
    await loginPage.login(username, password);
  });

  test('Dashboard displays welcome message after login', async () => {
    // ✅ THE CHECK (Assertions)
    await expect(dashboardPage.welcomeMessage).toBeVisible();
    await expect(dashboardPage.welcomeMessage).toHaveText(/welcome back/i);
  });

  test('Dashboard displays total net worth', async () => {
    // 🏗️ THE PLAN (Test-specific data)
    const netWorthPattern: RegExp = /\$/;

    // ✅ THE CHECK (Assertions)
    await expect(dashboardPage.netWorthValue).toBeVisible();
    await expect(dashboardPage.netWorthValue).toContainText(netWorthPattern);
  });

  test('Dashboard shows recent transactions table', async () => {
    // ✅ THE CHECK (Assertions)
    await expect(dashboardPage.recentTransactionsTable).toBeVisible();
  });

});
