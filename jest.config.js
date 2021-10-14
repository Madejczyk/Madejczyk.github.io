module.exports = {
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  roots: ['<rootDir>/src/'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
}
