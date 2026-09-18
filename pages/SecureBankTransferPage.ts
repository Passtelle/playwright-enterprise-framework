import type { Locator, Page } from "@playwright/test";

export class SecureBankTransferPage {

  // 🏗️ THE PLAN (Locators & Page Reference)
  readonly page: Page;
  readonly fromAccountSelect: Locator;
  readonly toAccountSelect: Locator;
  readonly amountInput: Locator;
  readonly reviewTransferButton: Locator;
  readonly cancelButton: Locator;
  readonly sidebarTransferLink: Locator;
  readonly confirmTransferButton: Locator;
  readonly confirmDialog: Locator;
  readonly successHeading: Locator;
  readonly transferRefId: Locator;
  readonly confirmFromAccount: Locator;
  readonly confirmToAccount: Locator;
  readonly confirmAmount: Locator;
  readonly backToDashboardButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fromAccountSelect = page.getByTestId("transfer-from-select"); // 🥇 Gold
    this.toAccountSelect = page.getByTestId("transfer-to-select"); // 🥇 Gold
    this.amountInput = page.getByTestId("transfer-amount-input"); // 🥇 Gold
    this.reviewTransferButton = page.getByTestId("review-transfer-btn"); // 🥇 Gold
    this.cancelButton = page.getByTestId("cancel-transfer-btn"); // 🥇 Gold
    this.confirmTransferButton = page.getByTestId("confirm-transfer-btn"); // 🥇 Gold
    this.confirmDialog = page.getByTestId("transfer-confirm-dialog"); // 🥇 Gold
    this.successHeading = page.getByTestId("transfer-success-heading"); // 🥇 Gold
    this.transferRefId = page.getByTestId("transfer-ref-id"); // 🥇 Gold
    this.confirmFromAccount = page.getByTestId("confirm-from-account"); // 🥇 Gold
    this.confirmToAccount = page.getByTestId("confirm-to-account"); // 🥇 Gold
    this.confirmAmount = page.getByTestId("confirm-amount"); // 🥇 Gold
    this.backToDashboardButton = page.getByTestId("back-to-dashboard-btn"); // 🥇 Gold
    this.sidebarTransferLink = page.getByTestId("sidebar-link-transfer"); // 🥇 Gold
  }

  // 🎬 THE WORK (Actions)
  async navigateToTransfer(): Promise<void> {
    await this.sidebarTransferLink.click();
  }

  async selectFromAccount(accountName: string): Promise<void> {
    await this.fromAccountSelect.click();
    await this.page.getByRole("option", { name: new RegExp(accountName, "i") }).click();
  }

  async selectToAccount(accountName: string): Promise<void> {
    await this.toAccountSelect.click();
    await this.page.getByRole("option", { name: new RegExp(accountName, "i") }).click();
  }

  async submitTransfer(fromAccount: string, toAccount: string, amount: string): Promise<void> {
    await this.selectFromAccount(fromAccount);
    await this.selectToAccount(toAccount);
    await this.amountInput.fill(amount);
    await this.reviewTransferButton.click();
    await this.confirmTransferButton.click();
  }
}
