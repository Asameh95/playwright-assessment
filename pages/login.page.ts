import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly emailField = this.page.locator('input[data-qa="login-email"]');
  readonly passwordField = this.page.locator('input[data-qa="login-password"]');
  readonly loginButton = this.page.locator('button[data-qa="login-button"]');
  readonly logoutButton = this.page.locator('a[href="/logout"]');
  readonly errorMessageLocator = this.page.locator('.login-form p');
  readonly errorMessage = 'Your email or password is incorrect!';

  async login(email: string, password: string) {
    console.log(`Attempting to log in with email: ${email}`);
    await this.fill(this.emailField, email, 'Email field');
    await this.fill(this.passwordField, password, 'Password field');
    await this.click(this.loginButton, 'Login button');
    console.log('Login button clicked — waiting for response');
  }

  async logout() {
    console.log('Initiating logout process...');
    await this.click(this.logoutButton, 'Logout link');
    console.log('Logout action performed successfully');
  }

  async verifyLoginErrorMessage() {
    console.log('Verifying Error Message...');
    await expect(this.errorMessageLocator).toContainText(this.errorMessage);
    console.log('Error Message Verified');
  }
}
