import { IS_MOCK } from '@/config/env';
import { getMockMarketData } from '@/mocks/marketMock';
import { marketRepository } from '@/repositories/marketRepository';
import type { MarketData } from '@/types/market';
import type { MarketScope } from '@/types/settings';

/** Fetches the market board data of an item for the given scope (world, data center or region). */
export async function getMarketData(itemId: number, scope: MarketScope): Promise<MarketData> {
    if (IS_MOCK) {
        return getMockMarketData(itemId, scope);
    }
    return marketRepository.getMarketData(itemId, scope.target);
}
