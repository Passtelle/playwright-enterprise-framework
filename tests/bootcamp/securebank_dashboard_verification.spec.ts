import { test, expect } from '@playwright/test';
import { SecureBankLoginPage } from '../../pages/SecureBankLoginPage';
import { SecureBankDashboardPage } from '../../pages/SecureBankDashboardPage';

test.describe('SecureBank Dashboard - State Verification', () => {

  // 🏗️ THE PLAN (Shared Variables)
  let loginPage: SecureBankLoginPage;
  let dashboardPage: SecureBankDashboardPage;
  const username: string = 'admin';
  const password: string = 'admin123';

  test.beforeEach(async ({ page }) => {
    loginPage = new SecureBankLoginPage(page);
    dashboardPage = new SecureBankDashboardPage(page);
    await loginPage.goto();
    await loginPage.login(username, password);
  });

  test('Dashboard displays total balance after login', async () => {
    // 🏗️ THE PLAN (Test-specific data)
    const balancePattern: RegExp = /\$/i;

    // 🎬 THE WORK (Actions)
    await dashboardPage.navigateToDashboard();

    // ✅ THE CHECK (Assertions)
    await expect(dashboardPage.totalBalance).toBeVisible();
    await expect(dashboardPage.totalBalance).toContainText(balancePattern);
  });

  test('Dashboard shows account count greater than zero', async () => {
    // 🏗️ THE PLAN (Test-specific data)
    const zeroAccounts: string = '0';

    // 🎬 THE WORK (Actions)
    await dashboardPage.navigateToDashboard();

    // ✅ THE CHECK (Assertions)
    await expect(dashboardPage.accountsCount).toBeVisible();
    await expect(dashboardPage.accountsCount).not.toHaveText(zeroAccounts);
  });

  test('Dashboard shows transaction count', async () => {
    // 🎬 THE WORK (Actions)
    await dashboardPage.navigateToDashboard();

    // ✅ THE CHECK (Assertions)
    await expect(dashboardPage.transactionsCount).toBeVisible();
  });

});
