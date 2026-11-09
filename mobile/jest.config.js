// ==============================================================================
// CONFIGURACION MAESTRA DE JEST - TESTING UNITARIO (AutoCheck Mobile)
// ==============================================================================
//
// ¿QUE HAGO EN ESTE ARCHIVO?
// Aqui defino como corre Jest cuando lanzo npm test en la terminal.
// Configure una estrategia hibrida para tener la maxima velocidad posible:
// 
// 1. Tomo el preset oficial de jest-expo (...jestExpoPreset) para que Babel se
//    encargue de los modulos de React Native y librerias externas de node_modules.
// 2. Para todo el codigo que escribo en TypeScript dentro de src/ (.ts y .tsx),
//    uso el compilador @swc/jest escrito en Rust. Esto hace que mis componentes
//    se transformen al instante sin la lentitud tipica de Babel.
// 3. Conecto este archivo con jest.setup.js para limpiar estado antes de cada prueba.
//
// ==============================================================================

const jestExpoPreset = require('jest-expo/jest-preset');

module.exports = {
  // 1. Heredo el entorno base de Expo con mocks nativos (fuentes, plataforma, etc.)
  ...jestExpoPreset,

  transform: {
    // Mantengo los transformadores de Babel que Expo necesita para librerias externas
    ...jestExpoPreset.transform,

    // Uso SWC en Rust para compilar mi codigo TypeScript a velocidad maxima
    '^.+\\.(ts|tsx)$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          transform: {
            react: {
              runtime: 'automatic', // JSX automatico sin obligarme a importar React en cada archivo
            },
          },
        },
      },
    ],
  },

  // 2. Archivo de arranque que limpio antes de cada suite de pruebas
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // 3. Carpetas que excluyo para no malgastar memoria ni tiempo de CPU
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.expo/'],

  // 4. Archivos que tomo en cuenta para medir la cobertura de codigo
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
};
