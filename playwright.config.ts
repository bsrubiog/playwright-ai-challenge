import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Reporte HTML detallado obligatorio
  reporter: [
  ['html'],
  ['allure-playwright', { outputFolder: 'allure-results' }]
],

use: {
  baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
  trace: 'retain-on-failure',
  screenshot: 'only-on-failure',
  video: 'on', // <--- Forzar la grabación en todos los tests
},

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});