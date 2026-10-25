/**
 * ==============================================================================
 * DESIGN TOKENS: RADIOS DE BORDE (Border Radii)
 * ==============================================================================
 *
 * ¿QUE HAGO EN ESTE ARCHIVO?
 * Aqui defino las curvaturas de las esquinas (borderRadius) que uso en todos
 * los componentes visuales de la aplicacion movil.
 *
 * ¿COMO LO DISTRIBUYO?
 * - sm (6) y md (10): para botones e inputs de texto.
 * - lg (16) y xl (24): para tarjetas de vehiculos, contenedores y modales.
 * - full (9999): para elementos circulares como avatares, chips o el boton flotante (+).
 *
 * ¿CON QUIEN CONECTA?
 * - Lo empaqueto en src/theme/index.ts.
 * - Lo aplico directamente en Button, Card e Input.
 *
 * ==============================================================================
 */

export const radii = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 9999, // Para botones redondos, avatares o chips
} as const;

export type Radii = typeof radii;
