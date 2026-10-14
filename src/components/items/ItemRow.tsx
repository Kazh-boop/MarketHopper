import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { List, useTheme } from 'react-native-paper';

import { useTranslation } from '@/i18n/useTranslation';
import { spacing } from '@/theme/spacing';
import type { Item } from '@/types/item';

import { ItemIcon } from './ItemIcon';

interface ItemRowProps {
    item: Item;
    onPress: (item: Item) => void;
}

function ItemRowComponent({ item, onPress }: ItemRowProps) {
    const theme = useTheme();
    const t = useTranslation();
    const description = [item.category, item.level > 0 ? t.itemDetail.level(item.level) : null]
        .filter(Boolean)
        .join(' · ');

    return (
        <List.Item
            title={item.name}
            description={description}
            titleNumberOfLines={1}
            descriptionNumberOfLines={1}
            titleStyle={{ color: theme.colors.onSurface }}
            descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
            onPress={() => onPress(item)}
            accessibilityRole="button"
            accessibilityLabel={`${item.name}, ${description}`}
            style={styles.row}
            left={() => (
                <View style={styles.icon}>
                    <ItemIcon uri={item.iconUrl} />
                </View>
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
    );
}

export const ItemRow = memo(ItemRowComponent);

const styles = StyleSheet.create({
    row: {
        paddingLeft: spacing.lg,
        paddingRight: spacing.sm,
    },
    icon: {
        justifyContent: 'center',
    },
});
