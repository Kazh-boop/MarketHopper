import React, { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';

import { STORAGE_KEYS } from '@/constants/storageKeys';
import { usePersistentState } from '@/hooks/usePersistentState';
import type { Item } from '@/types/item';

export const MAX_RECENT_ITEMS = 10;
export const MAX_FAVORITES = 200;

interface ItemCollectionsContextValue {
    favorites: Item[];
    recentItems: Item[];
    isFavorite: (itemId: number) => boolean;
    toggleFavorite: (item: Item) => void;
    addRecentItem: (item: Item) => void;
    clearRecentItems: () => void;
}

const ItemCollectionsContext = createContext<ItemCollectionsContextValue | null>(null);

const EMPTY_ITEMS: Item[] = [];

function isItem(value: unknown): value is Item {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    const item = value as Record<string, unknown>;
    return (
        typeof item.id === 'number' &&
        typeof item.name === 'string' &&
        typeof item.iconUrl === 'string' &&
        typeof item.iconHdUrl === 'string' &&
        typeof item.level === 'number' &&
        typeof item.canBeHq === 'boolean'
    );
}

function parseStoredItems(stored: unknown): Item[] | null {
    return Array.isArray(stored) ? stored.filter(isItem) : null;
}

/** Puts `item` first, removing any previous occurrence, and caps the list size. */
export function prependUnique(items: Item[], item: Item, maxSize: number): Item[] {
    return [item, ...items.filter((existing) => existing.id !== item.id)].slice(0, maxSize);
}

/** Favorites and recently viewed items, persisted on the device. */
export function ItemCollectionsProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = usePersistentState(
        STORAGE_KEYS.favorites,
        EMPTY_ITEMS,
        parseStoredItems,
    );
    const [recentItems, setRecentItems] = usePersistentState(
        STORAGE_KEYS.recentItems,
        EMPTY_ITEMS,
        parseStoredItems,
    );

    const favoriteIds = useMemo(() => new Set(favorites.map((item) => item.id)), [favorites]);

    const isFavorite = useCallback((itemId: number) => favoriteIds.has(itemId), [favoriteIds]);

    const toggleFavorite = useCallback(
        (item: Item) =>
            setFavorites((prev) =>
                prev.some((favorite) => favorite.id === item.id)
                    ? prev.filter((favorite) => favorite.id !== item.id)
                    : prependUnique(prev, item, MAX_FAVORITES),
            ),
        [setFavorites],
    );

    const addRecentItem = useCallback(
        (item: Item) => setRecentItems((prev) => prependUnique(prev, item, MAX_RECENT_ITEMS)),
        [setRecentItems],
    );

    const clearRecentItems = useCallback(() => setRecentItems([]), [setRecentItems]);

    const value = useMemo(
        () => ({
            favorites,
            recentItems,
            isFavorite,
            toggleFavorite,
            addRecentItem,
            clearRecentItems,
        }),
        [favorites, recentItems, isFavorite, toggleFavorite, addRecentItem, clearRecentItems],
    );

    return (
        <ItemCollectionsContext.Provider value={value}>{children}</ItemCollectionsContext.Provider>
    );
}

export function useItemCollections(): ItemCollectionsContextValue {
    const context = useContext(ItemCollectionsContext);
    if (!context) {
        throw new Error('useItemCollections must be used within an ItemCollectionsProvider');
    }
    return context;
}
