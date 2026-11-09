/**
 * ==============================================================================
 * COMPONENTE BASE: <Button /> (Boton Interactivo con Estados)
 * ==============================================================================
 *
 * ¿QUE HAGO EN ESTE COMPONENTE?
 * Aqui creo el boton principal reutilizable de la aplicacion movil.
 * Lo disene para soportar multiples variantes visuales, animaciones de carga
 * y estados de bloqueo sin tener que duplicar codigo en las pantallas.
 *
 * ¿COMO FUNCIONA?
 * 1. Propiedad "variant":
 *    - primary: fondo verde AutoCheck para la accion principal (por ejemplo "Iniciar Sesion").
 *    - secondary: fondo azul pizarra para acciones complementarias.
 *    - outline: fondo transparente con borde para opciones secundarias como "Cancelar".
 *    - danger: fondo rojo para acciones destructivas como "Eliminar Vehiculo".
 * 2. Propiedad "isLoading":
 *    - Si esta cargando (true), oculto el texto y pinto un indicador de carga (ActivityIndicator).
 *    - Al mismo tiempo desactivo el boton para evitar que el usuario pulse dos veces.
 * 3. Propiedad "disabled":
 *    - Reduce la opacidad al 50% y anula las pulsaciones tactiles.
 *
 * ¿CON QUIEN CONECTA?
 * - Utilizo theme desde ../theme y el componente Text desde ./Text.
 * - Lo pruebo en src/components/__tests__/Button.test.tsx.
 *
 * ==============================================================================
 */

import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { theme } from '../theme';
import { Text } from './Text';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';

interface ButtonProps extends TouchableOpacityProps {
  /** Texto visible dentro del boton */
  title: string;
  /** Variante de estilo segun la importancia de la accion */
  variant?: ButtonVariant;
  /** Si esta cargando, muestro un spinner y bloqueo las pulsaciones */
  isLoading?: boolean;
}

export function Button({
  title,
  variant = 'primary',
  isLoading = false,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  // El boton se bloquea tanto si viene disabled como si esta en estado de carga
  const isButtonDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isButtonDisabled}
      style={[
        styles.base,
        styles[variant],
        isButtonDisabled && styles.disabled,
        style,
      ]}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === 'outline' ? theme.colors.primary : theme.colors.textInverse}
        />
      ) : (
        <Text
          variant="label"
          style={[textStyles[variant]]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: theme.radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.border,
  },
  danger: {
    backgroundColor: theme.colors.error,
  },
  disabled: {
    opacity: 0.5,
  },
});

const textStyles = StyleSheet.create({
  primary: {
    color: theme.colors.textInverse,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  secondary: {
    color: theme.colors.textInverse,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  outline: {
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  danger: {
    color: theme.colors.textInverse,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});
