import type { Locator, Page } from "@playwright/test";

export class SecureBankLoginPage {
  // 🏗️ THE PLAN (Locators & Page Reference)
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId("login-username-input"); // 🥇 Gold
    this.passwordInput = page.getByTestId("login-password-input"); // 🥇 Gold
    this.loginButton = page.getByTestId("login-submit-btn"); // 🥇 Gold
    this.errorMessage = page.getByTestId("login-error-banner"); // 🥇 Gold
  }

  // 🎬 THE WORK (Actions)
  async goto(): Promise<void> {
    await this.page.goto("https://www.qaplayground.com/bank/login");
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.clear();
    await this.usernameInput.fill(username);
    await this.passwordInput.clear();
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
