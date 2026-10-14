import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { useTranslation } from '@/i18n/useTranslation';
import { radius } from '@/theme/spacing';

/** Small "HQ" tag displayed next to high quality listings and sales. */
export function HqBadge() {
    const theme = useTheme();
    const t = useTranslation();
    return (
        <View style={[styles.badge, { borderColor: theme.colors.primary }]}>
            <Text style={[styles.text, { color: theme.colors.primary }]}>{t.common.hq}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        borderRadius: radius.sm,
        borderWidth: 1,
        paddingHorizontal: 4,
        paddingVertical: 1,
        marginLeft: 6,
    },
    text: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});
