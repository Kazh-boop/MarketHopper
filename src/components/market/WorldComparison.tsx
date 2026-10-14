import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { ExpandableList } from '@/components/common/ExpandableList';
import { useTranslation } from '@/i18n/useTranslation';
import { radius, spacing } from '@/theme/spacing';
import type { WorldPrice } from '@/types/market';
import { formatGil } from '@/utils/format';

import { HqBadge } from './HqBadge';

const INITIAL_WORLDS = 5;

function WorldPriceRow({ world, rank }: { world: WorldPrice; rank: number }) {
    const theme = useTheme();
    const t = useTranslation();
    const isCheapest = rank === 0;
    const price = formatGil(world.pricePerUnit, t);
    const difference = isCheapest ? t.itemDetail.cheapest : `+${world.differencePercent} %`;

    return (
        <View
            style={[
                styles.row,
                { borderColor: theme.colors.outline },
                isCheapest && { backgroundColor: theme.colors.primaryContainer },
            ]}
            accessible
            accessibilityLabel={`${world.worldName}, ${price}, ${difference}`}
        >
            <Text
                variant="labelLarge"
                style={[styles.rank, { color: theme.colors.onSurfaceVariant }]}
            >
                {rank + 1}
            </Text>
            <View style={styles.world}>
                <Text variant="bodyLarge" numberOfLines={1} style={isCheapest && styles.bold}>
                    {world.worldName}
                </Text>
                {world.hq ? <HqBadge /> : null}
            </View>
            <View style={styles.prices}>
                <Text variant="bodyLarge" style={styles.bold}>
                    {price}
                </Text>
                <Text
                    variant="bodySmall"
                    style={{
                        color: isCheapest ? theme.colors.primary : theme.colors.onSurfaceVariant,
                    }}
                >
                    {difference}
                </Text>
            </View>
        </View>
    );
}

/** Cheapest listing of each world, the reason to "hop" between worlds. */
export function WorldComparison({ worlds }: { worlds: WorldPrice[] }) {
    return (
        <ExpandableList
            data={worlds}
            initialCount={INITIAL_WORLDS}
            renderItem={(world, index) => (
                <WorldPriceRow key={world.worldName} world={world} rank={index} />
            )}
        />
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderRadius: radius.sm,
    },
    rank: {
        width: 24,
    },
    world: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    prices: {
        alignItems: 'flex-end',
    },
    bold: {
        fontWeight: '700',
    },
});
