import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductsPage extends BasePage {
  readonly allProductsLink = this.page.locator('a[href="/products"]');
  readonly productsList = this.page.locator('.features_items .product-image-wrapper');
  readonly searchField = this.page.locator('#search_product');
  readonly searchButton = this.page.locator('button[id="submit_search"]');
  readonly cartButton = this.page.locator('a[href="/view_cart"]').first();
  readonly addToCartButton = this.page.locator('text=Add to cart');
  readonly continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });


  async goToAllProducts() {
    console.log('Navigating to "All Products" page...');
    await this.click(this.allProductsLink, 'All Products link');
    console.log('Reached All Products section');
  }

  async searchProduct(keyword: string) {
    console.log(`Searching for product with keyword: "${keyword}"`);
    await this.fill(this.searchField, keyword, 'Search product input');

    // Wait until button is ready to be clicked
    await expect(this.searchButton).toBeEnabled();
    await expect(this.searchButton).toBeVisible();
    await this.page.waitForLoadState('networkidle');
    await this.click(this.searchButton, 'Search button');

    console.log(`Search submitted for keyword: "${keyword}"`);
  }

  async addProductToCart() {
    console.log('Adding first product from the list to the cart...');
    const product = this.productsList.first();
    await product.scrollIntoViewIfNeeded();
    await product.hover();
    console.log('Hovered over first product — clicking "Add to cart"');
    const addButton = product.locator('text=Add to cart').first();
    await expect(addButton).toBeVisible({ timeout: 5000 });
    await this.click(addButton,  '"Add to cart" button');
    await this.clickOnContinueShopping();
    console.log('Product successfully added to cart');
  }

  async goToCart() {
    console.log('Navigating to Cart page...');
    await this.click(this.cartButton, 'Cart button');
    console.log('Cart page opened');
  }

  async verifyProductExist(keyword: string) {
    console.log(`Verifying product: ${keyword} exists...`);
    const matchingProduct = this.productsList.filter({hasText: keyword,});
    await expect(matchingProduct.first()).toBeVisible({ timeout: 15000 });
    console.log(`Product: ${keyword} does exist as expected`);
  }

  async clickOnContinueShopping() {
    console.log(`Clicking on Continue Shopping...`);
    await this.click(this.continueShoppingButton, 'Continue Shopping button');
  }
}
