import { xivapiClient } from '@/api/httpClient';
import { buildItemSearchQuery, mapXivapiItem } from '@/mappers/xivapiMapper';
import type { ItemSearchPage } from '@/types/item';
import type { XivapiLanguage, XivapiSearchResponse } from '@/types/xivapi';

export const ITEM_SEARCH_PAGE_SIZE = 20;

const ITEM_FIELDS = 'Name,Icon,Rarity,CanBeHq,LevelItem@as(raw),ItemSearchCategory.Name';

export interface ItemSearchParams {
    query: string;
    language: XivapiLanguage;
    /** Cursor returned by the previous page; when set, `query` is ignored by XIVAPI. */
    cursor?: string | null;
}

/** Access to the game items through XIVAPI. */
export const itemRepository = {
    async search({ query, language, cursor }: ItemSearchParams): Promise<ItemSearchPage> {
        const params = cursor ? { cursor } : { sheets: 'Item', query: buildItemSearchQuery(query) };

        const { data } = await xivapiClient.get<XivapiSearchResponse>('/search', {
            params: { ...params, language, limit: ITEM_SEARCH_PAGE_SIZE, fields: ITEM_FIELDS },
        });

        return {
            items: data.results.map(mapXivapiItem),
            nextCursor: data.next ?? null,
        };
    },
};
