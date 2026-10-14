import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

import { radius, spacing } from '@/theme/spacing';
import { getThemePalette, type ThemeName } from '@/theme/theme';

interface ThemeCardProps {
    name: ThemeName;
    label: string;
    selected: boolean;
    onPress: (name: ThemeName) => void;
}

/** Miniature preview of a theme, drawn with the theme's own colors. */
export function ThemeCard({ name, label, selected, onPress }: ThemeCardProps) {
    const palette = getThemePalette(name);

    return (
        <Pressable
            onPress={() => onPress(name)}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            accessibilityLabel={label}
            style={({ pressed }) => [
                styles.card,
                {
                    backgroundColor: palette.background,
                    borderColor: selected ? palette.primary : palette.outline,
                    opacity: pressed ? 0.8 : 1,
                },
                selected && styles.selected,
            ]}
        >
            <View style={[styles.preview, { backgroundColor: palette.surface }]}>
                <View style={[styles.dot, { backgroundColor: palette.primary }]} />
                <View style={[styles.line, { backgroundColor: palette.onSurfaceVariant }]} />
            </View>
            <View style={styles.footer}>
                <Text style={[styles.label, { color: palette.onSurface }]} numberOfLines={1}>
                    {label}
                </Text>
                {selected ? <Icon source="check-circle" size={16} color={palette.primary} /> : null}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flexBasis: '30%',
        flexGrow: 1,
        minWidth: 96,
        borderRadius: radius.md,
        borderWidth: 1,
        overflow: 'hidden',
    },
    selected: {
        borderWidth: 2,
    },
    preview: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.md,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    line: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        opacity: 0.5,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.sm,
        minHeight: 36,
    },
    label: {
        flex: 1,
        fontSize: 12,
        fontWeight: '600',
    },
});
