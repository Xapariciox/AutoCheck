/**
 * ==============================================================================
 * DESIGN TOKENS: ESPACIADOS Y MARGENES (Spacing Scale)
 * ==============================================================================
 *
 * ¿QUE HAGO EN ESTE ARCHIVO?
 * Aqui defino la escala metrica fija de margenes y rellenos (padding y margin)
 * para toda la aplicacion.
 *
 * ¿COMO FUNCIONA?
 * Sigo una escala basada en multiplos de 4px y 8px (estandar de la industria).
 * De esta manera no uso numeros arbitrarios (como 13px o 17px) y consigo que
 * todas las vistas tengan una separacion visual simetrica y ordenada.
 *
 * ¿CON QUIEN CONECTA?
 * - Lo empaqueto dentro de src/theme/index.ts.
 * - Lo utilizo en los estilos de Button, Card, Input y en los layouts de pantallas.
 *
 * ==============================================================================
 */

export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export type Spacing = typeof spacing;
