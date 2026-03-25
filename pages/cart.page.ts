import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export interface PaymentInfo {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

export class CartPage extends BasePage {
  readonly cartItems = this.page.locator('.cart_info tbody tr');
  readonly proceedCheckoutButton = this.page.locator('.btn.btn-default.check_out');
  readonly placeOrderButton = this.page.locator('a[href="/payment"]');
  readonly orderConfirmedText = this.page.locator('p:has-text("Congratulations! Your order has been confirmed!")');

  // Payment info
  readonly nameOnCardField = this.page.locator('input[name="name_on_card"]');
  readonly cardNumberField = this.page.locator('input[name="card_number"]');
  readonly cvcField = this.page.locator('input[name="cvc"]');
  readonly expiryMonthField = this.page.locator('input[name="expiry_month"]');
  readonly expiryYearField = this.page.locator('input[name="expiry_year"]');
  readonly payAndConfirmButton = this.page.locator('button:has-text("Pay and Confirm Order")');


  async proceedToCheckout() {
    console.log('Proceeding to checkout...');
    await this.click(this.proceedCheckoutButton, 'Proceed to Checkout button');
    console.log('Checkout button clicked');
  }

  async placeOrder() {
    console.log('Placing order...');
    await this.click(this.placeOrderButton, 'Place Order button');
    console.log('Place Order button clicked');
  }

  async verifyOrderConfirmation() {
    console.log('Verifying order confirmation message...');
    await this.expectVisible(this.orderConfirmedText, 'Order confirmation text');
    console.log('Order confirmation verified — order completed successfully');
  }

  async verifyProductInCart() {
    console.log('Verifying product in Cart...');
    await expect(this.cartItems.first()).toBeVisible();
    console.log('Product is in Cart as expected');
  }

  async fillPaymentDetails(paymentInfo: PaymentInfo) {
  console.log('Filling payment information...');
  await this.nameOnCardField.fill(paymentInfo.nameOnCard);
  await this.cardNumberField.fill(paymentInfo.cardNumber);
  await this.cvcField.fill(paymentInfo.cvc);
  await this.expiryMonthField.fill(paymentInfo.expiryMonth);
  await this.expiryYearField.fill(paymentInfo.expiryYear);
  console.log('Payment form filled — submitting...');
  await this.payAndConfirmButton.click();
}
}
