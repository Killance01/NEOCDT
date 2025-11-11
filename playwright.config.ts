import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  timeout: 60000,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    baseURL: 'http://localhost:5173',
    ignoreHTTPSErrors: true,

    // Añadido slowMo para introducir 1000ms de delay entre acciones
    launchOptions: {
      slowMo: 1000,
    },

    // 🎥 Grabación y depuración
    video: 'on', // 'retain-on-failure' si quieres grabar solo en fallos
    screenshot: 'only-on-failure', // guarda capturas si falla
    trace: 'retain-on-failure', // guarda el rastro interactivo del test
  },

  // 🧾 Reporter para ver resultados bonitos
  reporter: [
    ['list'], // muestra resultados en consola
    ['html', { open: 'never' }], // genera reporte visual en html-report/
  ],
};

export default config;