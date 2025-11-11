import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).fill('roimanurrego@gmail.com');
  await page.getByRole('textbox', { name: 'Correo' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('neoagente');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('combobox').first().selectOption('Pendiente');
  await page.getByRole('combobox').nth(1).selectOption('Aprobado');
  await page.getByRole('combobox').nth(2).selectOption('Activo');
  await page.getByRole('combobox').nth(3).selectOption('Rechazado');
  await page.getByRole('button', { name: 'Ver detalle' }).first().click();
  await page.getByRole('button', { name: '×' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Eliminar' }).first().click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Cerrar sesión' }).click();
});