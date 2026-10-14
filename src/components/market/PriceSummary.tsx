import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';

import { useTranslation } from '@/i18n/useTranslation';
import { radius, spacing } from '@/theme/spacing';
import type { PriceStats } from '@/types/market';
import { formatGil, formatNumber } from '@/utils/format';

interface StatTileProps {
    label: string;
    value: string;
    highlight?: boolean;
}

function StatTile({ label, value, highlight = false }: StatTileProps) {
    const theme = useTheme();
    return (
        <Surface
            elevation={1}
            style={[styles.tile, highlight && { borderColor: theme.colors.primary }]}
            accessible
            accessibilityLabel={`${label}: ${value}`}
        >
            <Text
                variant="labelMedium"
                numberOfLines={2}
                style={{ color: theme.colors.onSurfaceVariant }}
            >
                {label}
            </Text>
            <Text
                variant="titleMedium"
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[styles.value, highlight && { color: theme.colors.primary }]}
            >
                {value}
            </Text>
        </Surface>
    );
}

export function PriceSummary({ stats }: { stats: PriceStats }) {
    const t = useTranslation();
    return (
        <View style={styles.row}>
            <StatTile
                label={t.itemDetail.lowestPrice}
                value={formatGil(stats.minPrice, t)}
                highlight
            />
            <StatTile
                label={t.itemDetail.averageSale}
                value={formatGil(stats.averageSalePrice, t)}
            />
            <StatTile
                label={t.itemDetail.saleVelocity}
                value={formatNumber(stats.saleVelocity, t.locale, 1)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    tile: {
        flex: 1,
        padding: spacing.md,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    value: {
        marginTop: spacing.xs,
        fontWeight: '700',
    },
});
