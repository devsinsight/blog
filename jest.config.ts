import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config = createJestConfig({
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^nanoid$': 'nanoid/non-secure',
  },
  transformIgnorePatterns: ['/node_modules/(?!nanoid/|@portabletext/react/|react-syntax-highlighter/|refractor/|@sanity/image-url/)'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
});

export default config;
