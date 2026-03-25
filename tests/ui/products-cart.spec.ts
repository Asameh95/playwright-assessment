import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/products.page';
import { CartPage } from '../../pages/cart.page';
import { LoginPage } from '../../pages/login.page';
import data from '../../utils/test-data';

test.describe('Product, Cart & Checkout Suite', () => {
  test('TC-05: All products are populated', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);

    await login.navigateTo('/login');
    await login.login(data.existingUser.email, data.existingUser.password);
    await products.goToAllProducts()
    await expect(products.productsList.first()).toBeVisible();
    console.log("The Products are visible");
  });

  test('TC-06: Search product by keyword', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);

    await login.navigateTo('/login');
    await login.login(data.existingUser.email, data.existingUser.password);
    await products.goToAllProducts()
    await products.searchProduct(data.product.keyword);
    await products.verifyProductExist(data.product.keyword);
  });

  test('TC-07: Add product to cart', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);

    await login.navigateTo('/login');
    await login.login(data.existingUser.email, data.existingUser.password);
    await products.goToAllProducts()
    await products.searchProduct(data.product.keyword);
    await products.verifyProductExist(data.product.keyword);
    await products.addProductToCart();
    await products.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.verifyProductInCart();
  });

  test('TC-08: Complete checkout flow', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await login.navigateTo('/login');
    await login.login(data.existingUser.email, data.existingUser.password);
    await products.goToAllProducts()
    await products.searchProduct(data.product.keyword);
    await products.verifyProductExist(data.product.keyword);
    await products.addProductToCart();
    await products.goToCart();
    await cart.proceedToCheckout();
    await cart.placeOrder();
    await cart.fillPaymentDetails(data.paymentData);
    await cart.verifyOrderConfirmation();
  });
});
