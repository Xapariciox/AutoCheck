/**
 * ==============================================================================
 * DESIGN TOKENS: TIPOGRAFIA Y JERARQUIA VISUAL (Typography Scale)
 * ==============================================================================
 *
 * ¿QUE HAGO EN ESTE ARCHIVO?
 * Aqui establezco las reglas tipograficas de la app: tamanos de fuente (fontSize),
 * pesos (fontWeight) y alturas de linea (lineHeight).
 *
 * ¿COMO FUNCIONA?
 * Mantengo una jerarquia clara:
 * - Textos secundarios o pies de foto: xs (12px) y sm (14px).
 * - Cuerpo de lectura normal: md (16px).
 * - Titulos de seccion: lg (18px) y xl (20px).
 * - Encabezados principales: xxl (24px) y display (32px).
 *
 * ¿CON QUIEN CONECTA?
 * - Lo empaqueto en src/theme/index.ts.
 * - Lo utilizo en el componente Text (src/components/Text.tsx) para resolver variantes.
 *
 * ==============================================================================
 */

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    display: 32,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 16,
    normal: 22,
    relaxed: 28,
  },
} as const;

export type Typography = typeof typography;
