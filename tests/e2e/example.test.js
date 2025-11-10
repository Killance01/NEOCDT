import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(1000);

  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.waitForTimeout(1000);

  await page.getByRole('textbox', { name: 'Correo' }).fill('roimanurrego4@gmail.com');
  await page.waitForTimeout(1000);

  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.waitForTimeout(1000);

  await page.getByRole('textbox', { name: 'Contraseña' }).fill('neoroiman');
  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Crear nuevo CDT' }).click();
  await page.waitForTimeout(1000);

  await page.getByPlaceholder('Monto').click();
  await page.waitForTimeout(1000);

  await page.getByPlaceholder('Monto').fill('200000');
  await page.waitForTimeout(1000);

  await page.getByPlaceholder('Plazo (días)').click();
  await page.waitForTimeout(1000);

  await page.getByPlaceholder('Plazo (días)').fill('30');
  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: 'Abrir CDT' }).click();
  await page.waitForTimeout(1000);

  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });

  await page.getByRole('button', { name: 'Cerrar sesión' }).click();
  await page.waitForTimeout(1000);
});
