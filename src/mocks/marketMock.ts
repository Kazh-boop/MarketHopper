import {
    DATA_CENTERS,
    getWorldsByDataCenter,
    UNIVERSALIS_REGION_NAMES,
    type Region,
} from '@/constants/universalis';
import type { Listing, MarketData, PriceStats, Quality, Sale } from '@/types/market';
import type { MarketScope } from '@/types/settings';
import { delay } from '@/utils/delay';

const MOCK_LATENCY_MS = 500;
const HOUR_MS = 3_600_000;
const RETAINERS = ['Ramsy', 'Augrelt', 'Mogpo', 'Lalafell-Inc', 'Tataru', 'Hildi', 'Kupka'];
const BUYERS = ["Y'shtola Rhul", 'Alphinaud Leveilleur', 'Thancred Waters', 'Urianger Augurelle'];

/** Small deterministic PRNG (mulberry32) so mock data is stable across renders. */
function createRandom(seed: number): () => number {
    let state = seed;
    return () => {
        state = (state + 0x6d2b79f5) | 0;
        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function hashString(value: string): number {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
        hash = (Math.imul(31, hash) + value.charCodeAt(i)) | 0;
    }
    return hash;
}

function getScopeWorlds(scope: MarketScope): readonly string[] {
    switch (scope.kind) {
        case 'world':
            return [scope.target];
        case 'dataCenter':
            return getWorldsByDataCenter(scope.target);
        case 'region': {
            const region = (Object.keys(UNIVERSALIS_REGION_NAMES) as Region[]).find(
                (key) => UNIVERSALIS_REGION_NAMES[key] === scope.target,
            );
            return DATA_CENTERS.filter((dc) => dc.region === region).flatMap((dc) => dc.worlds);
        }
    }
}

function pick<T>(random: () => number, values: readonly T[]): T {
    return values[Math.floor(random() * values.length)] as T;
}

function computeStats(
    listings: Listing[],
    sales: Sale[],
    filter: (hq: boolean) => boolean,
): PriceStats {
    const filteredListings = listings.filter((listing) => filter(listing.hq));
    const filteredSales = sales.filter((sale) => filter(sale.hq));
    const totalSold = filteredSales.reduce((sum, sale) => sum + sale.quantity, 0);
    return {
        minPrice: filteredListings[0]?.pricePerUnit ?? null,
        averageSalePrice:
            filteredSales.length > 0
                ? Math.round(
                      filteredSales.reduce((sum, sale) => sum + sale.pricePerUnit, 0) /
                          filteredSales.length,
                  )
                : null,
        saleVelocity: Math.round((totalSold / 7) * 10) / 10,
    };
}

/** Generates realistic-looking market data, used when `EXPO_PUBLIC_MOCK=true`. */
export async function getMockMarketData(itemId: number, scope: MarketScope): Promise<MarketData> {
    await delay(MOCK_LATENCY_MS);

    const random = createRandom(hashString(`${itemId}:${scope.target}`));
    const worlds = getScopeWorlds(scope);
    const showWorld = scope.kind !== 'world';
    const basePrice = 50 + Math.floor(random() * 5000);
    const now = Date.now();

    const listings: Listing[] = Array.from(
        { length: 12 + Math.floor(random() * 30) },
        (_, index) => {
            const hq = random() < 0.35;
            const pricePerUnit = Math.round(basePrice * (0.8 + random() * 1.2) * (hq ? 1.3 : 1));
            const quantity = 1 + Math.floor(random() * 99);
            return {
                id: `${itemId}-${index}`,
                pricePerUnit,
                quantity,
                total: pricePerUnit * quantity,
                hq,
                retainerName: pick(random, RETAINERS),
                worldName: showWorld ? pick(random, worlds) : null,
                reviewedAt: now - Math.floor(random() * 48 * HOUR_MS),
            };
        },
    ).sort((a, b) => a.pricePerUnit - b.pricePerUnit);

    const sales: Sale[] = Array.from({ length: 20 }, () => {
        const hq = random() < 0.35;
        const pricePerUnit = Math.round(basePrice * (0.7 + random() * 0.8) * (hq ? 1.3 : 1));
        const quantity = 1 + Math.floor(random() * 20);
        return {
            pricePerUnit,
            quantity,
            total: pricePerUnit * quantity,
            hq,
            worldName: showWorld ? pick(random, worlds) : null,
            buyerName: pick(random, BUYERS),
            soldAt: now - Math.floor(random() * 7 * 24 * HOUR_MS),
        };
    }).sort((a, b) => b.soldAt - a.soldAt);

    const stats: Record<Quality, PriceStats> = {
        all: computeStats(listings, sales, () => true),
        nq: computeStats(listings, sales, (hq) => !hq),
        hq: computeStats(listings, sales, (hq) => hq),
    };

    return {
        itemId,
        lastUploadAt: now - Math.floor(random() * 6 * HOUR_MS),
        listings,
        sales,
        stats,
    };
}
