import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { theme } from '../theme';

type CardStatus = 'green' | 'yellow' | 'red' | 'grey';

interface CardProps extends ViewProps {
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
        elevation: 2, // Sombra suave en Android
    },
});