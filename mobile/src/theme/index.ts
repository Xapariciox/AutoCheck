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
export * from './colors';
export * from './spacing';
export * from './typography';
export * from './radii';