import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/register.page';
import { LoginPage } from '../../pages/login.page';
import data from '../../utils/test-data';

test.describe('User Authentication Suite', () => {
  test('TC-01: Register new user', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.registerNewUser(data.newUser);
    await registerPage.verifyLogin();
  });

  test('TC-02: Login with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigateTo('/login');
    await login.login(data.existingUser.email, data.existingUser.password);
    await login.verifyLogin();
  });

  test('TC-03: Login with invalid password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigateTo('/login');
    await login.login(data.existingUser.email, 'wrongpassword');
    await login.verifyLoginErrorMessage();
  });

  test('TC-04: Logout user', async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigateTo('/login');
    await login.login(data.existingUser.email, data.existingUser.password);
    await login.logout();
    await login.verifyLogout();
  });
});
