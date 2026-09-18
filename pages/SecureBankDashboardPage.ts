import type { Locator, Page } from "@playwright/test";

export class SecureBankDashboardPage {

  // 🏗️ THE PLAN (Locators & Page Reference)
  readonly page: Page;
  readonly welcomeMessage: Locator;
  readonly netWorthValue: Locator;
  readonly statCards: Locator;
  readonly recentTransactionsTable: Locator;
  readonly sidebarDashboardLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.getByTestId("dashboard-welcome-message"); // 🥇 Gold
    this.netWorthValue = page.getByTestId("stat-card-net-worth-value"); // 🥇 Gold
    this.statCards = page.getByTestId("dashboard-stat-cards"); // 🥇 Gold
    this.recentTransactionsTable = page.getByTestId("recent-transactions-table"); // 🥇 Gold
    this.sidebarDashboardLink = page.getByTestId("sidebar-link-dashboard"); // 🥇 Gold
  }

  // 🎬 THE WORK (Actions)
  async goto(): Promise<void> {
    await this.page.goto("https://www.qaplayground.com/bank/dashboard");
  }

  async navigateToDashboard(): Promise<void> {
    await this.sidebarDashboardLink.click();
  }
}
