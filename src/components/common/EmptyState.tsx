import React, { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';

import { spacing } from '@/theme/spacing';

interface EmptyStateProps {
    icon: string;
    title: string;
    description?: string;
    /** Optional call to action (usually a Button). */
    action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    const theme = useTheme();
    return (
        <View style={styles.container} accessibilityRole="summary">
            <Icon source={icon} size={48} color={theme.colors.onSurfaceVariant} />
            <Text variant="titleMedium" style={styles.title}>
                {title}
            </Text>
            {description ? (
                <Text
                    variant="bodyMedium"
                    style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
                >
                    {description}
                </Text>
            ) : null}
            {action ? <View style={styles.action}>{action}</View> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.xxl,
    },
    title: {
        marginTop: spacing.md,
        textAlign: 'center',
    },
    description: {
        marginTop: spacing.xs,
        textAlign: 'center',
        maxWidth: 360,
    },
    action: {
        marginTop: spacing.lg,
    },
});
