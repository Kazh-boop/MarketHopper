import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/api/queryClient';
import { getMarketData } from '@/services/marketService';
import type { MarketScope } from '@/types/settings';

const MARKET_STALE_TIME_MS = 60_000;

/** Market board data of an item; disabled while no market scope is configured. */
export function useMarketData(itemId: number, scope: MarketScope | null) {
    return useQuery({
        queryKey: queryKeys.marketData(itemId, scope?.target ?? ''),
        queryFn: () => {
            if (!scope) {
                throw new Error('Market scope is required');
            }
            return getMarketData(itemId, scope);
        },
        enabled: scope !== null,
        staleTime: MARKET_STALE_TIME_MS,
    });
}
