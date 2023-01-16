import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  verbose: true,
  testMatch: [
    '**/__tests__/*.test.ts',
  ],
};

export default config;
