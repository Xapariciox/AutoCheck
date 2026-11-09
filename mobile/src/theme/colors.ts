export const colors = {
    //Marca Principal (AutoCheck)
    primary: '#10B981',
    primaryDark: '#059669',
    primaryLight: '#D1FAE5',

    //Secundario y Acentos
    secondary: '#0F172A',
    secondaryLight: '#1E293B',

    //Semaforo Oficial (4 Estados del README)
    trafficLight: {
        green: {
            main: '#16A34A',
            bg: '#DCFCE7',
            text: '#15803D',
            label: 'Al dia'
        },
        yellow: {
            main: '#EAB308',
            bg: '#FEF9C3',
            text: '#A16207',
            label: 'Atención Proxima',
        },
        red: {
            main: '#DC2626',
            bg: '#fee2e2',
            text: '#B91C1C',
            label: 'Mantenimiento vencido',
        },
        grey: {
            main: '#94A3BB',
            bg: '#F1F5F9',
            text: '#475569',
            label: 'Sin calibrar',
        },
    },

    //Fondos y Superficies 
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceAlt: '#F1F5F9',

    //Textos
    textPrimary: '#0F172A',
    textSecondary: '64748B',
    textMuted: '#94A3B8',
    textInverse: '#FFFFFF',

    //Bordes y Divisores
    border: '#E2E8F0',
    borderFocus: '#10B981',

    //Estados genèricos 
    error: '#DC2626',
    warning: '#EAB308',
    success: '#16A34A',
    info: '#3B82F6',
} as const;

export type Colors = typeof colors;