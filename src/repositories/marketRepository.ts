import { universalisClient } from '@/api/httpClient';
import { mapMarketData } from '@/mappers/universalisMapper';
import type { MarketData } from '@/types/market';
import type { UniversalisMarketResponse } from '@/types/universalis';

/**
 * Number of listings fetched. Listings are sorted by price, so this is enough to find the
 * cheapest offer of every world while keeping the payload small on popular items.
 */
const MAX_LISTINGS = 100;
const MAX_SALES = 30;

/** Access to the market board data through Universalis. */
export const marketRepository = {
    async getMarketData(itemId: number, scopeTarget: string): Promise<MarketData> {
        const { data } = await universalisClient.get<UniversalisMarketResponse>(
            `/${encodeURIComponent(scopeTarget)}/${itemId}`,
            { params: { listings: MAX_LISTINGS, entries: MAX_SALES } },
        );
        return mapMarketData(data);
    },
};
