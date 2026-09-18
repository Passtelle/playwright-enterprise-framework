import { test, expect } from '@playwright/test';
import { SecureBankLoginPage } from '../../pages/SecureBankLoginPage';
import { SecureBankDashboardPage } from '../../pages/SecureBankDashboardPage';
import { SecureBankTransferPage } from '../../pages/SecureBankTransferPage';

test.describe('SecureBank E2E - Transfer Flow', () => {

  // 🏗️ THE PLAN (Shared Variables)
  let loginPage: SecureBankLoginPage;
  let dashboardPage: SecureBankDashboardPage;
  let transferPage: SecureBankTransferPage;

  const username: string = 'standard_user';
  const password: string = 'bank_sauce';
  const fromAccount: string = 'Everyday Checking';
  const toAccount: string = 'High-Yield Savings';

  test.beforeEach(async ({ page }) => {
    loginPage = new SecureBankLoginPage(page);
    dashboardPage = new SecureBankDashboardPage(page);
    transferPage = new SecureBankTransferPage(page);
    await loginPage.goto();
    await loginPage.login(username, password);
    await expect(dashboardPage.welcomeMessage).toBeVisible();
  });

  test('Test 1 - Happy Path: Transfer between accounts shows success confirmation', async ({ page }) => {
    // 🏗️ THE PLAN (Test-specific data)
    const transferAmount: string = '100';
    const expectedAmountText: RegExp = /\$100\.00/i;

    // 🎬 THE WORK (Actions)
    await transferPage.navigateToTransfer();
    await transferPage.submitTransfer(fromAccount, toAccount, transferAmount);

    // ✅ THE CHECK (Assertions)
    await expect(transferPage.successHeading).toBeVisible();
    await expect(transferPage.successHeading).toHaveText(/transfer successful/i);
    await expect(transferPage.transferRefId).toBeVisible();
    await expect(transferPage.confirmFromAccount).toHaveText(new RegExp(fromAccount, 'i'));
    await expect(transferPage.confirmToAccount).toHaveText(new RegExp(toAccount, 'i'));
    await expect(transferPage.confirmAmount).toHaveText(expectedAmountText);
  });

  test('Test 2 - Happy Path: Dashboard net worth unchanged after internal transfer', async ({ page }) => {
    // 🏗️ THE PLAN (Test-specific data)
    const transferAmount: string = '50';
    const expectedNetWorth: RegExp = /\$17,050\.00/i;

    // 🎬 THE WORK (Actions)
    await transferPage.navigateToTransfer();
    await transferPage.submitTransfer(fromAccount, toAccount, transferAmount);
    await dashboardPage.navigateToDashboard();
    await expect(dashboardPage.welcomeMessage).toBeVisible();

    // ✅ THE CHECK (Assertions)
    await expect(dashboardPage.netWorthValue).toHaveText(expectedNetWorth);
  });

  test('Test 3 - Negative Path: Transfer with empty amount shows validation', async () => {
    // 🏗️ THE PLAN (Test-specific data)
    const emptyAmount: string = '';

    // 🎬 THE WORK (Actions)
    await transferPage.navigateToTransfer();
    await transferPage.selectFromAccount(fromAccount);
    await transferPage.selectToAccount(toAccount);
    await transferPage.amountInput.fill(emptyAmount);
    await transferPage.reviewTransferButton.click();

    // ✅ THE CHECK (Assertions)
    await expect(transferPage.confirmDialog).not.toBeVisible({ timeout: 2000 });
  });

});
