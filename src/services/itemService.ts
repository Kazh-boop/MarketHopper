import { IS_MOCK } from '@/config/env';
import type { Language } from '@/i18n/translations';
import { searchMockItems } from '@/mocks/itemsMock';
import { itemRepository } from '@/repositories/itemRepository';
import type { ItemSearchPage } from '@/types/item';

export const MIN_SEARCH_LENGTH = 2;

const EMPTY_PAGE: ItemSearchPage = { items: [], nextCursor: null };

export function normalizeSearchQuery(query: string): string {
    return query.trim().replace(/\s+/g, ' ');
}

export function isSearchQueryValid(query: string): boolean {
    return normalizeSearchQuery(query).length >= MIN_SEARCH_LENGTH;
}

/**
 * Searches marketable items by name.
 * Routes to the mock data or to XIVAPI depending on the configuration.
 */
export async function searchItems(
    query: string,
    language: Language,
    cursor: string | null = null,
): Promise<ItemSearchPage> {
    if (!cursor && !isSearchQueryValid(query)) {
        return EMPTY_PAGE;
    }
    const normalizedQuery = normalizeSearchQuery(query);

    if (IS_MOCK) {
        return searchMockItems(normalizedQuery, cursor);
    }
    return itemRepository.search({ query: normalizedQuery, language, cursor });
}
