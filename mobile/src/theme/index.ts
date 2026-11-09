/**
 * ==============================================================================
 * EXPORTACION MAESTRA DEL TEMA (Theme Index)
 * ==============================================================================
 *
 * ¿QUE HAGO EN ESTE ARCHIVO?
 * Aqui unifico todos los tokens de diseno (colores, espaciados, tipografia y radios)
 * en un unico objeto central llamado "theme".
 *
 * ¿COMO LO USO EN MIS COMPONENTES Y PANTALLAS?
 * En lugar de importar varios archivos, hago:
 *
 * import { theme } from '../theme';
 * const styles = StyleSheet.create({
 *   box: {
 *     padding: theme.spacing.md,
 *     backgroundColor: theme.colors.background,
 *     borderRadius: theme.radii.lg,
 *   }
 * });
 *
 * ¿CON QUIEN CONECTA?
 * - Reune: ./colors, ./spacing, ./typography y ./radii.
 * - Lo consume toda la aplicacion movil.
 *
 * ==============================================================================
 */

import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { radii } from './radii';

export const theme = {
  colors,
  spacing,
  typography,
  radii,
} as const;

export type Theme = typeof theme;

// Re-exporto los modulos individuales por si requiero tipos o valores directos
export * from './colors';
export * from './spacing';
export * from './typography';
export * from './radii';
