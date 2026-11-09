/**
 * ==============================================================================
 * COMPONENTE BASE: <Text /> (Tipografia Accesible y Tipada)
 * ==============================================================================
 *
 * ¿QUE HAGO EN ESTE COMPONENTE?
 * Aqui encapsulo el componente Text nativo de React Native para no tener que
 * repetir estilos de fuentes ni colores sueltos en cada vista.
 *
 * ¿COMO FUNCIONA?
 * Acepto una propiedad llamada "variant" que aplica automaticamente la escala de
 * tamano, peso y altura de linea que defini en mi tema:
 * - display: para titulos de gran tamano (32px, negrita).
 * - h1 / h2 / h3: para encabezados principales y nombres de secciones (24px, 20px, 18px).
 * - body: para texto de parrafo comun y corriente (16px).
 * - label: para textos de botones e indicaciones de inputs (14px, medium).
 * - caption: para notas pequenas, fechas y mensajes de error (12px).
 *
 * Tambien permito pasar una propiedad opcional "color" para sobrescribir el color base
 * sin perder la escala tipografica.
 *
 * ¿CON QUIEN CONECTA?
 * - Utilizo theme.typography y theme.colors desde ../theme.
 * - Lo utilizo dentro de Button, Card, Input y en todas las pantallas de la app.
 *
 * ==============================================================================
 */

import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { theme } from '../theme';

type TextVariant = 'display' | 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';

interface CustomTextProps extends RNTextProps {
  /** Variante tipografica predefinida del sistema de diseno */
  variant?: TextVariant;
  /** Color especifico si necesito cambiar el texto por defecto */
  color?: string;
  children: React.ReactNode;
}

export function Text({
  variant = 'body',
  color,
  style,
  children,
  ...rest
}: CustomTextProps) {
  return (
    <RNText
      style={[
        styles[variant],
        color ? { color } : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  display: {
    fontSize: theme.typography.fontSize.display,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  h1: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  h2: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
  },
  h3: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
  },
  body: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.textPrimary,
    lineHeight: theme.typography.lineHeight.normal,
  },
  caption: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.textSecondary,
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textSecondary,
  },
});
