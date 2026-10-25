/**
 * ==============================================================================
 * COMPONENTE BASE: <Card /> (Contenedor con Franja de Estado del Semaforo)
 * ==============================================================================
 *
 * ¿QUE HAGO EN ESTE COMPONENTE?
 * Aqui diseno el contenedor de tarjetas para agrupar vehiculos, mantenimientos,
 * consumibles y alertas del garaje.
 *
 * ¿COMO FUNCIONA?
 * Proporciono una caja blanca elevada con bordes redondeados y sombra suave.
 * Lo mas importante es la propiedad opcional "status" (green | yellow | red | grey):
 * - Si le paso un status, pinto una franja vertical de 4px en el lateral izquierdo
 *   utilizando el color exacto del semaforo vehicular de theme.colors.trafficLight.
 * - Manejo sombras nativas en ambas plataformas: shadow* para iOS y elevation para Android.
 *
 * ¿CON QUIEN CONECTA?
 * - Utilizo theme.colors.trafficLight, theme.radii y theme.spacing.
 * - Lo utilizo en las pantallas de Garaje, Ficha de Vehiculo y Plan de Mantenimiento.
 *
 * ==============================================================================
 */

import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { theme } from '../theme';

type CardStatus = 'green' | 'yellow' | 'red' | 'grey';

interface CardProps extends ViewProps {
  /** Estado del semaforo para pintar la franja vertical de alerta (opcional) */
  status?: CardStatus;
  children: React.ReactNode;
}

export function Card({
  status,
  style,
  children,
  ...rest
}: CardProps) {
  return (
    <View
      style={[
        styles.card,
        status && {
          borderLeftWidth: 4,
          borderLeftColor: theme.colors.trafficLight[status].main,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2, // Sombra nativa en Android
  },
});
