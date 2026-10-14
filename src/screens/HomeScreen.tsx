import React, { useCallback, useState } from 'react';
import { FlatList, Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Searchbar, Surface, Text, useTheme } from 'react-native-paper';

import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ItemRow } from '@/components/items/ItemRow';
import { MarketScopeChip } from '@/components/market/MarketScopeChip';
import { useItemCollections } from '@/context/ItemCollectionsContext';
import { useSettings } from '@/context/SettingsContext';
import { useItemSearch } from '@/hooks/useItemSearch';
import { useTranslation } from '@/i18n/useTranslation';
import type { RootStackScreenProps } from '@/navigation/types';
import { radius, spacing } from '@/theme/spacing';
import type { Item } from '@/types/item';

type Props = RootStackScreenProps<'Home'>;

export default function HomeScreen({ navigation }: Props) {
    const theme = useTheme();
    const t = useTranslation();
    const [searchText, setSearchText] = useState('');
    const search = useItemSearch(searchText);

    const openItem = useCallback(
        (item: Item) => {
            Keyboard.dismiss();
            navigation.navigate('ItemDetail', { item });
        },
        [navigation],
    );
    const openSettings = useCallback(() => navigation.navigate('Settings'), [navigation]);

    const isSearching = searchText.trim().length > 0;
    const isLoadingFirstPage = search.isEnabled && (search.isPending || search.isDebouncing);

    const renderSearchContent = () => {
        if (!search.isEnabled && !search.isDebouncing) {
            return <EmptyState icon="keyboard-outline" title={t.home.searchHint} />;
        }
        if (search.isError && search.items.length === 0) {
            return <ErrorState error={search.error} onRetry={() => search.refetch()} />;
        }
        if (isLoadingFirstPage && search.items.length === 0) {
            return (
                <ActivityIndicator style={styles.loader} accessibilityLabel={t.common.loading} />
            );
        }
        if (search.items.length === 0) {
            return (
                <EmptyState
                    icon="magnify-close"
                    title={t.home.noResultsTitle}
                    description={t.home.noResults(search.query)}
                />
            );
        }
        return (
            <FlatList
                data={search.items}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <ItemRow item={item} onPress={openItem} />}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (search.hasNextPage && !search.isFetchingNextPage) {
                        void search.fetchNextPage();
                    }
                }}
                ListFooterComponent={
                    search.isFetchingNextPage ? (
                        <ActivityIndicator style={styles.footerLoader} />
                    ) : null
                }
            />
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Searchbar
                placeholder={t.home.searchPlaceholder}
                value={searchText}
                onChangeText={setSearchText}
                loading={search.isFetching && !search.isFetchingNextPage}
                clearAccessibilityLabel={t.home.clearSearch}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="search"
                style={styles.searchbar}
            />
            {isSearching ? (
                renderSearchContent()
            ) : (
                <DiscoverContent onOpenItem={openItem} onOpenSettings={openSettings} />
            )}
        </View>
    );
}

interface DiscoverContentProps {
    onOpenItem: (item: Item) => void;
    onOpenSettings: () => void;
}

/** Shown while the search is empty: market scope, favorites and history. */
function DiscoverContent({ onOpenItem, onOpenSettings }: DiscoverContentProps) {
    const theme = useTheme();
    const t = useTranslation();
    const { marketScope } = useSettings();
    const { favorites, recentItems, clearRecentItems } = useItemCollections();
    const hasCollections = favorites.length > 0 || recentItems.length > 0;

    return (
        <ScrollView
            contentContainerStyle={styles.discover}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
        >
            {marketScope ? (
                <View style={styles.scope}>
                    <MarketScopeChip scope={marketScope} onPress={onOpenSettings} />
                </View>
            ) : (
                <Surface style={styles.setupCard} elevation={1}>
                    <Text variant="titleMedium">{t.home.setupTitle}</Text>
                    <Text
                        variant="bodyMedium"
                        style={[styles.setupText, { color: theme.colors.onSurfaceVariant }]}
                    >
                        {t.home.setupDescription}
                    </Text>
                    <Button mode="contained" icon="earth" onPress={onOpenSettings}>
                        {t.home.setupAction}
                    </Button>
                </Surface>
            )}

            {favorites.length > 0 ? (
                <>
                    <View style={styles.section}>
                        <SectionHeader title={t.home.favorites} />
                    </View>
                    {favorites.map((item) => (
                        <ItemRow key={item.id} item={item} onPress={onOpenItem} />
                    ))}
                </>
            ) : null}

            {recentItems.length > 0 ? (
                <>
                    <View style={styles.section}>
                        <SectionHeader
                            title={t.home.recentlyViewed}
                            action={
                                <Button compact onPress={clearRecentItems}>
                                    {t.home.clearHistory}
                                </Button>
                            }
                        />
                    </View>
                    {recentItems.map((item) => (
                        <ItemRow key={item.id} item={item} onPress={onOpenItem} />
                    ))}
                </>
            ) : null}

            {!hasCollections ? (
                <EmptyState
                    icon="storefront-outline"
                    title={t.home.welcomeTitle}
                    description={t.home.welcomeDescription}
                />
            ) : null}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchbar: {
        marginHorizontal: spacing.lg,
        marginTop: spacing.md,
        marginBottom: spacing.sm,
    },
    loader: {
        marginTop: spacing.xxl,
    },
    footerLoader: {
        marginVertical: spacing.lg,
    },
    discover: {
        paddingBottom: spacing.xxl,
    },
    scope: {
        flexDirection: 'row',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.sm,
    },
    setupCard: {
        margin: spacing.lg,
        padding: spacing.lg,
        borderRadius: radius.lg,
        gap: spacing.md,
    },
    section: {
        paddingHorizontal: spacing.lg,
    },
    setupText: {
        marginBottom: spacing.xs,
    },
});
