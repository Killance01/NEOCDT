import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.locator('div').nth(1).click();
  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).fill('roimanurrego4@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('123');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('button', { name: '¿Olvidaste tu contraseña?' }).click();
  await page.getByRole('textbox', { name: 'Ingresa tu correo' }).click();
  await page.getByRole('textbox', { name: 'Ingresa tu correo' }).fill('roimanurrego4@gmail.com');
  await page.getByRole('button', { name: 'Enviar enlace de recuperación' }).click();
  await page.getByRole('link', { name: 'Volver al inicio de sesión' }).click();
});