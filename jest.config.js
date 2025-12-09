// Configuración de Jest para Next.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Ruta a tu aplicación Next.js para cargar next.config.js y archivos .env
  dir: './',
})

// Agregar cualquier configuración personalizada de Jest debajo
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  collectCoverageFrom: [
    'lib/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
}

// createJestConfig se exporta de esta manera para asegurar que next/jest pueda cargar la configuración de Next.js de forma asíncrona
module.exports = createJestConfig(customJestConfig)

