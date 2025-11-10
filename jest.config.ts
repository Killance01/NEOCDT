import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  testMatch: ['**/tests/backend/**/*.test.js', '**/tests/backend/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};

export default config;
