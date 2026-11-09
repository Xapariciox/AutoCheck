/**
 * ==============================================================================
 * DESIGN TOKENS: PALETA DE COLORES (AutoCheck Mobile)
 * ==============================================================================
 *
 * ¿QUE HAGO EN ESTE ARCHIVO?
 * Aqui centralizo todos los colores oficiales de la app movil.
 * En ninguna pantalla pongo colores hexadecimales sueltos a mano; todo lo saco
 * de este objeto para mantener coherencia en todo el proyecto.
 *
 * ¿COMO LO CONFIGURE?
 * Uso un objeto con "as const" para que TypeScript detecte cada color como un
 * tipo literal inmutable y me de autocompletado en el editor.
 *
 * Incluyo:
 * 1. Colores principales de marca (verde esmeralda AutoCheck).
 * 2. Secundarios para fondos oscuros y contrastes (azul pizarra).
 * 3. Los 4 estados oficiales del semaforo de salud vehicular (verde, amarillo, rojo, gris).
 * 4. Superficies, textos, bordes y estados de alerta.
 *
 * ¿CON QUIEN CONECTA?
 * - Lo exporto a traves de src/theme/index.ts.
 * - Lo consumo en Button, Card, Input, Text y en las pantallas de Login, Home y Vehiculos.
 *
 * ==============================================================================
 */

export const colors = {
  // 1. Marca principal (Verde Esmeralda AutoCheck)
  primary: '#10B981',
  primaryDark: '#059669',
  primaryLight: '#D1FAE5',

  // 2. Secundario y contraste (Azul Pizarra Oscuro)
  secondary: '#0F172A',
  secondaryLight: '#1E293B',

  // 3. Semaforo oficial de salud del vehiculo (4 estados)
  trafficLight: {
    green: {
      main: '#16A34A',
      bg: '#DCFCE7',
      text: '#15803D',
      label: 'Al día',
    },
    yellow: {
      main: '#EAB308',
      bg: '#FEF9C3',
      text: '#A16207',
      label: 'Atención Próxima',
    },
    red: {
      main: '#DC2626',
      bg: '#FEE2E2',
      text: '#B91C1C',
      label: 'Mantenimiento vencido',
    },
    grey: {
      main: '#94A3B8',
      bg: '#F1F5F9',
      text: '#475569',
      label: 'Sin calibrar',
    },
  },

  // 4. Fondos y superficies
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceAlt: '#F1F5F9',

  // 5. Textos
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textInverse: '#FFFFFF',

  // 6. Bordes y divisores
  border: '#E2E8F0',
  borderFocus: '#10B981',

  // 7. Estados genericos de alerta
  error: '#DC2626',
  warning: '#EAB308',
  success: '#16A34A',
  info: '#3B82F6',
} as const;

export type Colors = typeof colors;
