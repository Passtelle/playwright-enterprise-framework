import { test, expect } from '@playwright/test';
import { SecureBankLoginPage } from '../../pages/SecureBankLoginPage';
import { SecureBankDashboardPage } from '../../pages/SecureBankDashboardPage';

test.describe('SecureBank - Negative User Scenarios', () => {

  // 🏗️ THE PLAN (Shared Variables)
  let loginPage: SecureBankLoginPage;
  let dashboardPage: SecureBankDashboardPage;
  const sharedPassword: string = 'bank_sauce';

  test.beforeEach(async ({ page }) => {
    loginPage = new SecureBankLoginPage(page);
    dashboardPage = new SecureBankDashboardPage(page);
    await loginPage.goto();
  });

  test('Locked user is blocked at login with suspension message', async ({ page }) => {
    // 🏗️ THE PLAN (Test-specific data)
    const lockedUser: string = 'locked_user';
    const expectedError: RegExp = /suspended|locked|disabled/i;

    // 🎬 THE WORK (Actions)
    await loginPage.login(lockedUser, sharedPassword);

    // ✅ THE CHECK (Assertions)
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(expectedError);
    await expect(page).not.toHaveURL(/\/dashboard/i);
  });

  test('Frozen user sees account frozen banner on dashboard', async ({ page }) => {
    // 🏗️ THE PLAN (Test-specific data)
    const frozenUser: string = 'frozen_user';
    const frozenBanner = page.getByTestId('frozen-account-banner');
    const expectedBannerText: RegExp = /frozen/i;

    // 🎬 THE WORK (Actions)
    await loginPage.login(frozenUser, sharedPassword);

    // ✅ THE CHECK (Assertions)
    await expect(dashboardPage.welcomeMessage).toBeVisible();
    await expect(frozenBanner).toBeVisible();
    await expect(frozenBanner).toContainText(expectedBannerText);
  });

  test('Frozen user sees transfer disabled notice on transfer page', async ({ page }) => {
    // 🏗️ THE PLAN (Test-specific data)
    const frozenUser: string = 'frozen_user';
    const transferFrozenBanner = page.getByTestId('transfer-frozen-banner');
    const expectedNotice: RegExp = /disabled|frozen/i;

    // 🎬 THE WORK (Actions)
    await loginPage.login(frozenUser, sharedPassword);
    await page.getByTestId('sidebar-link-transfer').click();

    // ✅ THE CHECK (Assertions)
    await expect(transferFrozenBanner).toBeVisible();
    await expect(transferFrozenBanner).toContainText(expectedNotice);
  });

  test('Overdraft user has negative checking balance with overdrawn badge', async ({ page }) => {
    // 🏗️ THE PLAN (Test-specific data)
    const overdraftUser: string = 'overdraft_user';
    const overdrawnBadge = page.getByTestId('account-row-overdrawn');
    const checkingBalance = page.getByTestId('account-row-balance').first();
    const negativeBalancePattern: RegExp = /^-\$/;

    // 🎬 THE WORK (Actions)
    await loginPage.login(overdraftUser, sharedPassword);
    await page.getByTestId('sidebar-link-accounts').click();

    // ✅ THE CHECK (Assertions)
    await expect(overdrawnBadge).toBeVisible();
    await expect(checkingBalance).toContainText(negativeBalancePattern);
  });

  test('Error user loan page displays incorrect total (known bug)', async ({ page }) => {
    // 🏗️ THE PLAN (Test-specific data)
    const errorUser: string = 'error_user';
    const displayedTotal = page.getByTestId('loan-history-total-value');
    const loanAmounts = page.getByTestId('loan-history-amount');

    // 🎬 THE WORK (Actions)
    await loginPage.login(errorUser, sharedPassword);
    await page.getByTestId('sidebar-link-apply-loan').click();
    await expect(displayedTotal).toBeVisible();

    const totalText: string = (await displayedTotal.textContent()) ?? '';
    const displayedValue: number = parseFloat(totalText.replace(/[$,]/g, ''));

    const amountElements = await loanAmounts.all();
    let calculatedTotal: number = 0;
    for (const el of amountElements) {
      const text: string = (await el.textContent()) ?? '0';
      calculatedTotal += Math.abs(parseFloat(text.replace(/[$,+]/g, '')));
    }

    // ✅ THE CHECK (Assertions)
    expect(displayedValue).not.toBe(calculatedTotal);
  });

});
