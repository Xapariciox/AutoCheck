/**
 * ==============================================================================
 * COMPONENTE BASE: <Input /> (Campo de Formulario con Opcion de Contrasena)
 * ==============================================================================
 *
 * ¿QUE HAGO EN ESTE COMPONENTE?
 * Aqui construyo el campo de texto universal para todos los formularios de la app
 * (Login, Registro, datos de matricula, kilometraje del odometro, etc.).
 *
 * ¿COMO FUNCIONA?
 * 1. Etiqueta superior (label): pinto el titulo del campo con formato claro.
 * 2. Gestion de errores (error): si paso un string de error, el borde cambia a rojo
 *    y muestro el mensaje explicativo justo debajo.
 * 3. Texto de ayuda (helperText): si no hay error, muestro una pista o formato esperado.
 * 4. Soporte para contrasenas (secureTextEntry):
 *    - Si activo esta propiedad, detecto automaticamente que es un campo de clave.
 *    - Renderizo un boton tactil ("Ver" / "Ocultar") en el lateral derecho para que
 *      el usuario pueda alternar la visibilidad sin que la pantalla tenga que programarlo.
 * 5. Estados de foco (isFocused): cuando el usuario hace tap para escribir, resalto
 *    el borde con el color verde principal (borderFocus).
 *
 * ¿CON QUIEN CONECTA?
 * - Utilizo theme y el componente Text.
 * - Lo utilizo en los formularios de autenticacion y en las pantallas de registro de coches.
 *
 * ==============================================================================
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../theme';
import { Text } from './Text';

interface InputProps extends TextInputProps {
  /** Etiqueta descriptiva superior */
  label?: string;
  /** Mensaje de error para avisar de validaciones fallidas */
  error?: string;
  /** Mensaje de ayuda o formato sugerido debajo del campo */
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  style,
  secureTextEntry,
  ...rest
}: InputProps) {
  // Estado local para saber cuando el usuario tiene el foco en este input
  const [isFocused, setIsFocused] = useState(false);
  // Estado local para alternar entre mostrar u ocultar la contrasena
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Determino si este input fue configurado como campo de clave
  const isPassword = secureTextEntry !== undefined;
  const showPasswordToggle = isPassword;
  const actualSecureEntry = isPassword ? !isPasswordVisible : false;

  return (
    <View style={styles.container}>
      {label && <Text variant="label" style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.focusedWrapper,
          !!error && styles.errorWrapper,
        ]}
      >
        <TextInput
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, style]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={actualSecureEntry}
          {...rest}
        />

        {showPasswordToggle && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.toggleButton}
            onPress={() => setIsPasswordVisible((prev) => !prev)}
          >
            <Text variant="caption" style={styles.toggleText}>
              {isPasswordVisible ? 'Ocultar' : 'Ver'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <Text variant="caption" style={styles.errorText}>
          {error}
        </Text>
      ) : helperText ? (
        <Text variant="caption" style={styles.helperText}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    paddingHorizontal: theme.spacing.md,
    height: 48,
  },
  focusedWrapper: {
    borderColor: theme.colors.borderFocus,
  },
  errorWrapper: {
    borderColor: theme.colors.error,
  },
  input: {
    flex: 1,
    height: '100%',
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSize.md,
  },
  toggleButton: {
    paddingLeft: theme.spacing.sm,
  },
  toggleText: {
    color: theme.colors.primaryDark,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  errorText: {
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
  helperText: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
});
