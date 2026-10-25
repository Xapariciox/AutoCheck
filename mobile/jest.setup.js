// ==============================================================================
// CONFIGURACION PREVIA Y LIMPIEZA DE JEST (jest.setup.js)
// ==============================================================================
//
// ¿QUE HAGO EN ESTE ARCHIVO?
// Este script lo configure para que Jest lo ejecute automaticamente antes de cada
// suite de pruebas (gracias a setupFilesAfterEnv en jest.config.js).
//
// Mis dos objetivos aqui son:
// 1. Limpiar los mocks y funciones espias despues de cada prueba individual. Si en
//    el test 1 simulo que toco un boton 2 veces, en el test 2 el contador vuelve a 0
//    para no tener resultados falsos.
// 2. Filtrar warnings de consola que no son errores reales. Node no tiene pantalla
//    ni GPU, asi que React Native suelta advertencias con useNativeDriver que solo
//    ensucian la salida. Con este filtro la terminal se mantiene limpia.
//
// ==============================================================================

/* global jest, afterEach */

// 1. Reseteo de funciones espias y mocks despues de cada prueba
afterEach(() => {
  jest.clearAllMocks();
});

// 2. Filtro advertencias cosmeticas de animaciones nativas en Node
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Animated: `useNativeDriver`') ||
     args[0].includes('Sending `onAnimatedValueUpdate`'))
  ) {
    return;
  }
  originalWarn(...args);
};
