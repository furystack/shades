module.exports = {
  roots: ['<rootDir>/packages/shades'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**'],
  coverageReporters: ['text', 'json', 'html', 'cobertura'],
  reporters: ['default', 'jest-junit'],
}
