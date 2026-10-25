// ==============================================================================
// CONFIGURACION DE ESLINT V9 (Flat Config)
// ==============================================================================
//
// ¿QUE HAGO EN ESTE ARCHIVO?
// Aqui configuro el linter con el nuevo formato plano (Flat Config) de ESLint v9.
// Aplico el conjunto oficial de reglas de Expo (eslint-config-expo/flat) e ignoro
// las carpetas de compilacion temporal y dependencias (node_modules, .expo, dist)
// para mantener el codigo limpio y libre de errores de sintaxis.
//
// ==============================================================================

const expoConfig = require('eslint-config-expo/flat');

module.exports = [
  ...expoConfig,
  {
    ignores: ['node_modules', '.expo', 'dist'],
  },
];
