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
    title: string;
    variant?: ButtonVariant;
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