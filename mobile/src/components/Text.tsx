import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { theme } from '../theme';

type TextVariant = 'display' | 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';

interface CustomTextProps extends RNTextProps {
    variant?: TextVariant;
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