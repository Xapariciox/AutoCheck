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
    label?: string;
    error?: string;
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
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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