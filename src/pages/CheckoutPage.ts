import { Page } from '@playwright/test';
export class CheckoutPage {
  constructor(private page: Page) {}
  async addItemToCart() {
    await this.page.click('#add-to-cart-sauce-labs-backpack');
    await this.page.click('.shopping_cart_link');
  }
  async proceedToCheckout(firstName: string, lastName: string, postalCode: string) {
    await this.page.click('#checkout');
    await this.page.fill('#first-name', firstName);
    await this.page.fill('#last-name', lastName);
    await this.page.fill('#postal-code', postalCode);
    await this.page.click('#continue');
  }
  async finishCheckout() { await this.page.click('#finish'); }
  async getCompletionText(): Promise<string> {
    return await this.page.textContent('.complete-header') || '';
  }
}