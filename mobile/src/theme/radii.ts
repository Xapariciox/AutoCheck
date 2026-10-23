export const radii = {
    none: 0,
    sm: 6,
    md: 10,
    lg: 16,
    xl: 24,
    full: 9999, // Para botones redondos o avatares
} as const;
export type Radii = typeof radii;