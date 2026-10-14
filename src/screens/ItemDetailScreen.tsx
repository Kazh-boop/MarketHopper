import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Linking, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Appbar, Button, Text, useTheme } from 'react-native-paper';

import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { ExpandableList } from '@/components/common/ExpandableList';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ItemIcon } from '@/components/items/ItemIcon';
import { MarketEntryRow } from '@/components/market/MarketEntryRow';
import { MarketScopeChip } from '@/components/market/MarketScopeChip';
import { PriceSummary } from '@/components/market/PriceSummary';
import { QualityFilter } from '@/components/market/QualityFilter';
import { WorldComparison } from '@/components/market/WorldComparison';
import { UNIVERSALIS_WEB_URL } from '@/config/env';
import { useItemCollections } from '@/context/ItemCollectionsContext';
import { useSettings } from '@/context/SettingsContext';
import { useMarketData } from '@/hooks/useMarketData';
import { useTranslation } from '@/i18n/useTranslation';
import { getCheapestPerWorld, matchesQuality } from '@/mappers/universalisMapper';
import type { RootStackScreenProps } from '@/navigation/types';
import { spacing } from '@/theme/spacing';
import type { Item } from '@/types/item';
import type { Listing, MarketData, Quality, Sale } from '@/types/market';
import type { MarketScope } from '@/types/settings';
import { formatRelativeTime } from '@/utils/format';

type Props = RootStackScreenProps<'ItemDetail'>;

const INITIAL_ROWS = 8;

export default function ItemDetailScreen({ navigation, route }: Props) {
    const { item } = route.params;
    const theme = useTheme();
    const t = useTranslation();
    const { marketScope } = useSettings();
    const { isFavorite, toggleFavorite, addRecentItem } = useItemCollections();
    const market = useMarketData(item.id, marketScope);
    const [quality, setQuality] = useState<Quality>('all');
    const favorite = isFavorite(item.id);

    useEffect(() => {
        addRecentItem(item);
    }, [addRecentItem, item]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <>
                    <Appbar.Action
                        icon={favorite ? 'heart' : 'heart-outline'}
                        color={favorite ? theme.colors.primary : undefined}
                        onPress={() => toggleFavorite(item)}
                        accessibilityLabel={
                            favorite ? t.itemDetail.removeFavorite : t.itemDetail.addFavorite
                        }
                        accessibilityState={{ selected: favorite }}
                    />
                    <Appbar.Action
                        icon="open-in-new"
                        onPress={() => Linking.openURL(`${UNIVERSALIS_WEB_URL}/market/${item.id}`)}
                        accessibilityLabel={t.itemDetail.openUniversalis}
                    />
                </>
            ),
        });
    }, [navigation, favorite, item, t, theme.colors.primary, toggleFavorite]);

    const openSettings = useCallback(() => navigation.navigate('Settings'), [navigation]);

    return (
        <ScrollView
            style={{ backgroundColor: theme.colors.background }}
            contentContainerStyle={styles.content}
            refreshControl={
                <RefreshControl
                    refreshing={market.isRefetching}
                    onRefresh={() => market.refetch()}
                    tintColor={theme.colors.primary}
                    colors={[theme.colors.primary]}
                />
            }
        >
            <ItemHeader item={item} />

            <View style={styles.scopeRow}>
                <MarketScopeChip scope={marketScope} onPress={openSettings} />
            </View>

            {!marketScope ? (
                <EmptyState
                    icon="earth-off"
                    title={t.itemDetail.noScopeTitle}
                    description={t.itemDetail.noScopeDescription}
                    action={
                        <Button mode="contained" icon="earth" onPress={openSettings}>
                            {t.home.setupAction}
                        </Button>
                    }
                />
            ) : market.isPending ? (
                <ActivityIndicator style={styles.loader} accessibilityLabel={t.common.loading} />
            ) : market.isError ? (
                <ErrorState error={market.error} onRetry={() => market.refetch()} />
            ) : (
                <MarketSection
                    data={market.data}
                    scope={marketScope}
                    canBeHq={item.canBeHq}
                    quality={quality}
                    onQualityChange={setQuality}
                />
            )}
        </ScrollView>
    );
}

function ItemHeader({ item }: { item: Item }) {
    const theme = useTheme();
    const t = useTranslation();
    const subtitle = [item.category, item.level > 0 ? t.itemDetail.level(item.level) : null]
        .filter(Boolean)
        .join(' · ');

    return (
        <View style={styles.header}>
            <ItemIcon uri={item.iconHdUrl} size={64} />
            <View style={styles.headerTexts}>
                <Text variant="headlineSmall" style={styles.itemName} accessibilityRole="header">
                    {item.name}
                </Text>
                {subtitle ? (
                    <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                        {subtitle}
                    </Text>
                ) : null}
            </View>
        </View>
    );
}

interface MarketSectionProps {
    data: MarketData;
    scope: MarketScope;
    canBeHq: boolean;
    quality: Quality;
    onQualityChange: (quality: Quality) => void;
}

function MarketSection({ data, scope, canBeHq, quality, onQualityChange }: MarketSectionProps) {
    const theme = useTheme();
    const t = useTranslation();
    const activeQuality: Quality = canBeHq ? quality : 'all';
    const showWorld = scope.kind !== 'world';

    const listings = useMemo(
        () => data.listings.filter((listing) => matchesQuality(listing, activeQuality)),
        [data.listings, activeQuality],
    );
    const sales = useMemo(
        () => data.sales.filter((sale) => matchesQuality(sale, activeQuality)),
        [data.sales, activeQuality],
    );
    const worlds = useMemo(
        () => (showWorld ? getCheapestPerWorld(data.listings, activeQuality) : []),
        [data.listings, activeQuality, showWorld],
    );

    const listingDetails = (listing: Listing) =>
        [
            showWorld ? listing.worldName : null,
            listing.retainerName,
            formatRelativeTime(listing.reviewedAt, t),
        ]
            .filter(Boolean)
            .join(' · ');

    const saleDetails = (sale: Sale) =>
        [showWorld ? sale.worldName : null, sale.buyerName, formatRelativeTime(sale.soldAt, t)]
            .filter(Boolean)
            .join(' · ');

    return (
        <View>
            {canBeHq ? (
                <View style={styles.quality}>
                    <QualityFilter value={quality} onChange={onQualityChange} />
                </View>
            ) : null}

            <PriceSummary stats={data.stats[activeQuality]} />
            <Text
                variant="bodySmall"
                style={[styles.updated, { color: theme.colors.onSurfaceVariant }]}
            >
                {data.lastUploadAt
                    ? t.itemDetail.updated(formatRelativeTime(data.lastUploadAt, t))
                    : t.itemDetail.neverUpdated}
            </Text>

            {showWorld && worlds.length > 0 ? (
                <>
                    <SectionHeader
                        title={t.itemDetail.cheapestWorlds}
                        subtitle={t.itemDetail.cheapestWorldsHint}
                    />
                    <WorldComparison worlds={worlds} />
                </>
            ) : null}

            <SectionHeader title={t.itemDetail.listings} />
            {listings.length === 0 ? (
                <EmptyState icon="tag-off-outline" title={t.itemDetail.noListings} />
            ) : (
                <ExpandableList
                    data={listings}
                    initialCount={INITIAL_ROWS}
                    renderItem={(listing) => (
                        <MarketEntryRow
                            key={listing.id}
                            pricePerUnit={listing.pricePerUnit}
                            quantity={listing.quantity}
                            total={listing.total}
                            hq={listing.hq}
                            details={listingDetails(listing)}
                        />
                    )}
                />
            )}

            <SectionHeader title={t.itemDetail.sales} />
            {sales.length === 0 ? (
                <EmptyState icon="history" title={t.itemDetail.noSales} />
            ) : (
                <ExpandableList
                    data={sales}
                    initialCount={INITIAL_ROWS}
                    renderItem={(sale, index) => (
                        <MarketEntryRow
                            key={`${sale.soldAt}-${index}`}
                            pricePerUnit={sale.pricePerUnit}
                            quantity={sale.quantity}
                            total={sale.total}
                            hq={sale.hq}
                            details={saleDetails(sale)}
                        />
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: spacing.lg,
        paddingBottom: spacing.xxl,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.lg,
    },
    headerTexts: {
        flex: 1,
    },
    itemName: {
        fontWeight: '700',
    },
    scopeRow: {
        flexDirection: 'row',
        marginTop: spacing.lg,
        marginBottom: spacing.md,
    },
    quality: {
        marginBottom: spacing.md,
    },
    loader: {
        marginTop: spacing.xxl,
    },
    updated: {
        marginTop: spacing.sm,
        textAlign: 'right',
    },
});
