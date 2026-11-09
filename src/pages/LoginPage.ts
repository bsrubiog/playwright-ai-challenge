import { Page } from '@playwright/test';
export class LoginPage {
  constructor(private page: Page) {}
  async navigate() { await this.page.goto('/'); }
  async login(user: string, pass: string) {
    await this.page.fill('#user-name', user);
    await this.page.fill('#password', pass);
    await this.page.click('#login-button');
  }
}