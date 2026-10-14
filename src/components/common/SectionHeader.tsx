import React, { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { spacing } from '@/theme/spacing';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    /** Rendered on the right (e.g. a text button). */
    action?: ReactNode;
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
    const theme = useTheme();
    return (
        <View style={styles.container}>
            <View style={styles.texts}>
                <Text
                    variant="titleSmall"
                    accessibilityRole="header"
                    style={[styles.title, { color: theme.colors.primary }]}
                >
                    {title.toUpperCase()}
                </Text>
                {subtitle ? (
                    <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                        {subtitle}
                    </Text>
                ) : null}
            </View>
            {action}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: spacing.xl,
        marginBottom: spacing.sm,
        minHeight: 36,
    },
    texts: {
        flex: 1,
    },
    title: {
        letterSpacing: 1,
    },
});
