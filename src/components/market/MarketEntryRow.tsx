import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { useTranslation } from '@/i18n/useTranslation';
import { spacing } from '@/theme/spacing';
import { formatGil } from '@/utils/format';

import { HqBadge } from './HqBadge';

interface MarketEntryRowProps {
    pricePerUnit: number;
    quantity: number;
    total: number;
    hq: boolean;
    /** Secondary line: world, retainer, date… */
    details: string;
}

/** A listing or a sale: unit price and quantity on the left, total on the right. */
export function MarketEntryRow({
    pricePerUnit,
    quantity,
    total,
    hq,
    details,
}: MarketEntryRowProps) {
    const theme = useTheme();
    const t = useTranslation();
    const price = formatGil(pricePerUnit, t);
    const totalLabel = t.itemDetail.total(formatGil(total, t));

    return (
        <View
            style={[styles.row, { borderColor: theme.colors.outline }]}
            accessible
            accessibilityLabel={`${price} ${t.itemDetail.quantity(quantity)}${hq ? ` ${t.common.hq}` : ''}, ${totalLabel}, ${details}`}
        >
            <View style={styles.main}>
                <View style={styles.priceLine}>
                    <Text variant="bodyLarge" style={styles.price}>
                        {price}
                    </Text>
                    <Text
                        variant="bodyMedium"
                        style={[styles.quantity, { color: theme.colors.onSurfaceVariant }]}
                    >
                        {t.itemDetail.quantity(quantity)}
                    </Text>
                    {hq ? <HqBadge /> : null}
                </View>
                <Text
                    variant="bodySmall"
                    numberOfLines={1}
                    style={{ color: theme.colors.onSurfaceVariant }}
                >
                    {details}
                </Text>
            </View>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                {formatGil(total, t)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.xs,
        borderBottomWidth: StyleSheet.hairlineWidth,
        gap: spacing.md,
    },
    main: {
        flex: 1,
    },
    priceLine: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontWeight: '700',
    },
    quantity: {
        marginLeft: 6,
    },
});
