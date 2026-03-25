import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly consentButton;
  readonly manageOptionsButton;
  readonly logoutButton;
  readonly loginButton;

  constructor(page: Page) {
    this.page = page;
    this.consentButton = this.page.getByRole('button', { name: 'Consent' });
    this.manageOptionsButton = this.page.locator('text=Manage options');
    this.logoutButton = this.page.locator('a[href="/logout"]');
    this.loginButton = this.page.locator('a', { hasText: 'Login' });
    console.log(`Initialized with page instance`);
  }

  async navigateTo(path: string = '/') {
    const baseUrl = process.env.BASE_URL;
    const fullUrl = `${baseUrl}${path}`;
    console.log(`Navigating to: ${fullUrl}`);
    await this.page.goto(fullUrl);
    await this.acceptConsentIfVisible();
  }

  async acceptConsentIfVisible() {
    console.log(`Checking if consent popup is visible...`);
    try {
      if (await this.consentButton.isVisible({ timeout: 5000 })) {
        console.log(`Consent popup detected — clicking "Consent"`);
        await this.consentButton.click();
        console.log(`Consent accepted successfully`);
      } else {
        console.log(`Consent popup not visible`);
      }
    } catch (error) {
      console.log(`No consent popup found or click failed: ${(error as Error).message}`);
    }
  }

  async click(locator: Locator, description?: string) {
    console.log(`Clicking on: ${description || 'unknown element'}`);
    await locator.click();
    console.log(`Click action completed`);
  }

  async fill(locator: Locator, value: string, description?: string) {
    console.log(`Filling ${description || 'field'} with value: ${value}`);
    await locator.fill(value);
    console.log(`Input filled successfully`);
  }

  async expectVisible(locator: Locator, description?: string) {
    console.log(`Expecting visibility for: ${description || 'element'}`);
    await expect(locator).toBeVisible();
    console.log(`Visibility assertion passed`);
  }

  async verifyLogin() {
    await expect(this.logoutButton).toBeVisible();
    console.log('Account is logged in successfully');
  }

  async verifyLogout() {
    await expect(this.loginButton).toBeVisible();
    console.log('Account is logged out successfully');
  }
}
