import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).fill('roimanurrego4@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('neoroiman');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('link', { name: 'Crear nuevo CDT' }).click();
  await page.getByPlaceholder('Monto').click();
  await page.getByPlaceholder('Monto').fill('200000');
  await page.getByPlaceholder('Plazo (días)').click();
  await page.getByPlaceholder('Plazo (días)').fill('30');
  await page.getByRole('button', { name: 'Abrir CDT' }).click();


  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });

  await page.getByRole('button', { name: 'Cerrar sesión' }).click();

});
