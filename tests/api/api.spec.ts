import { test, expect, request } from '@playwright/test';
import { API_BASE_URL } from '../../utils/env';
import data from '../../utils/test-data';

test.describe('API Suite', () => {
  test('TC-09: GET /productsList returns products', async () => {
    const api = await request.newContext();
    const res = await api.get(`${API_BASE_URL}/productsList`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.products)).toBeTruthy();
  });

  test('TC-10: POST /searchProduct returns valid results', async () => {
    const api = await request.newContext();
    const res = await api.post(`${API_BASE_URL}/searchProduct`, {
      form: { search_product: data.product.keyword },
    });
    const body = await res.json();
    expect(res.ok()).toBeTruthy();
    expect(body.products[0].name.toLowerCase()).toContain(data.product.keyword);
  });

  test('TC-12: POST /verifyLogin invalid creds returns 404', async () => {
    const api = await request.newContext();
    const res = await api.post(`${API_BASE_URL}/verifyLogin`, {
      form: { email: 'fake@user.com', password: 'wrong' },
    });
    const body = await res.json();
    expect(res.status()).toBe(200); 
    expect(body.responseCode).toBe(404); 
    expect(body.message.toLowerCase()).toContain('not found');
  });
});
