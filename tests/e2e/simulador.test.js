import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).fill('danielsanchez@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('daniel');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('link', { name: 'Simulador' }).click();
  await page.getByRole('spinbutton', { name: 'Monto' }).click();
  await page.getByRole('spinbutton', { name: 'Monto' }).fill('1000000');
  await page.getByRole('spinbutton', { name: 'Plazo (días)' }).click();
  await page.getByRole('spinbutton', { name: 'Plazo (días)' }).fill('365');
  await page.getByRole('spinbutton', { name: 'Tasa EA (%)' }).click();
  await page.getByRole('spinbutton', { name: 'Tasa EA (%)' }).fill('12');
  await page.getByRole('spinbutton', { name: 'Retención (%)' }).click();
  await page.getByRole('button', { name: 'Quiero mi CDT' }).click();
  await page.getByPlaceholder('Monto').click();
  await page.getByPlaceholder('Monto').fill('1000000');
  await page.getByPlaceholder('Plazo (días)').click();
  await page.getByPlaceholder('Plazo (días)').fill('365');
  await page.getByRole('button', { name: 'Abrir CDT' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Cerrar sesión' }).click();
});