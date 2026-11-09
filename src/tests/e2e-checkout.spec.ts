import { test, expect } from '../fixtures/ai-fixture';
import { LoginPage } from '../pages/LoginPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Compra E2E con Datos Sintéticos y Aserción Semántica por IA', async ({ page, ai }) => {
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