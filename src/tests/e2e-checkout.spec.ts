import { test, expect } from '../fixtures/ai-fixture';
import { LoginPage } from '../pages/LoginPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import * as allure from 'allure-js-commons';

test('Compra E2E con Datos Sintéticos y Aserción Semántica por IA', async ({ page, ai }) => {
  // 1. Configurar la interceptación de red para adjuntar peticiones y respuestas a Allure
  page.on('request', async request => {
    try {
      await allure.attachment(
        `Request: ${request.method()} ${request.url()}`,
        request.postData() || 'Sin payload (GET o vacío)',
        'text/plain'
      );
    } catch (e) {
      // Evita interrupciones si el contexto de Allure finaliza antes de tiempo
    }
  });

  page.on('response', async response => {
    try {
      const url = response.url();
      // Filtramos para capturar las llamadas clave de la aplicación o APIs
      if (url.includes('saucedemo') || url.includes('api')) {
        const responseBody = await response.text().catch(() => 'No body available');
        await allure.attachment(
          `Response [${response.status()}] ${url}`,
          responseBody,
          'application/json'
        );
      }
    } catch (e) {
      // Manejo silencioso de excepciones en eventos asíncronos de red
    }
  });

  const loginPage = new LoginPage(page);
  const checkoutPage = new CheckoutPage(page);

  const syntheticPrompt = 'Genera nombre, apellido y código postal de 5 dígitos para un comprador en Bogotá. Formato JSON: {"firstName": "...", "lastName": "...", "postalCode": "..."}';
  const rawData = await ai.generateSyntheticData(syntheticPrompt);
  const userInfo = JSON.parse(rawData);

  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  await checkoutPage.addItemToCart();
  await checkoutPage.proceedToCheckout(userInfo.firstName, userInfo.lastName, userInfo.postalCode);
  await checkoutPage.finishCheckout();

  const successMessage = await checkoutPage.getCompletionText();
  const isSemanticMatch = await ai.assertSemanticIntent(
    successMessage, 
    'El mensaje indica de manera clara que la orden ha sido completada con éxito.'
  );

  expect(isSemanticMatch).toBeTruthy();
});