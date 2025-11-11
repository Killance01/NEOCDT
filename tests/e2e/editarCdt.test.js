import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).fill('danielsanchez@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('daniel');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('button', { name: 'Editar' }).nth(3).click();
  await page.getByPlaceholder('Monto').click();
  await page.getByPlaceholder('Monto').fill('2500000');
  await page.getByPlaceholder('Plazo (días)').click();
  await page.getByPlaceholder('Plazo (días)').fill('50');
  await page.getByRole('button', { name: 'Guardar Cambios' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Cerrar sesión' }).click();
});