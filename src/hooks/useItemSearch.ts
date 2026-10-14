import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { queryKeys } from '@/api/queryClient';
import { useSettings } from '@/context/SettingsContext';
import { isSearchQueryValid, normalizeSearchQuery, searchItems } from '@/services/itemService';
import type { Item } from '@/types/item';

import { useDebouncedValue } from './useDebouncedValue';

const SEARCH_DEBOUNCE_MS = 300;
const SEARCH_STALE_TIME_MS = 10 * 60_000;

/** Debounced, paginated item search in the user's language. */
export function useItemSearch(rawQuery: string) {
    const { settings } = useSettings();
    const query = normalizeSearchQuery(useDebouncedValue(rawQuery, SEARCH_DEBOUNCE_MS));
    const isEnabled = isSearchQueryValid(query);

    const result = useInfiniteQuery({
        queryKey: queryKeys.itemSearch(query, settings.language),
        queryFn: ({ pageParam }) => searchItems(query, settings.language, pageParam),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        enabled: isEnabled,
        staleTime: SEARCH_STALE_TIME_MS,
    });

    const items = useMemo<Item[]>(
        () => result.data?.pages.flatMap((page) => page.items) ?? [],
        [result.data],
    );

    return {
        ...result,
        items,
        /** The query actually searched (after debounce and normalisation). */
        query,
        isEnabled,
        /** `true` while the user is still typing. */
        isDebouncing: normalizeSearchQuery(rawQuery) !== query,
    };
}
