import { test, expect, request } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { API_BASE_URL } from '../../utils/env';
import data from '../../utils/test-data';

test('TC-11: Create account via API and verify via UI login', async ({ page }) => {
  const api = await request.newContext();
  
  // Use test data + override email
  const user = {
    ...data.newUser,
    email: `apiuser+${Date.now()}@test.com`,
  };

  // Create user via API
  const response = await api.post(`${API_BASE_URL}/createAccount`, {
    form: { 
      name: user.name,
      email: user.email,
      password: user.password,
      title: user.gender,
      birth_date: user.day,
      birth_month: user.month,
      birth_year: user.year,
      firstname: user.firstName,
      lastname: user.lastName,
      address1: user.address,
      country: user.country,
      zipcode: user.zipcode,
      state: user.state,
      city: user.city,
      mobile_number: user.mobileNumber,
      },
  });

  const body = await response.json();
  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(201); 

  // Verify login via UI
  const login = new LoginPage(page);
  await login.navigateTo('/login');
  await login.login(user.email, user.password);
  await login.verifyLogin();
});
