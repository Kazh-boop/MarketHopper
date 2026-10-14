import type { Listing } from '@/types/market';
import type { UniversalisMarketResponse } from '@/types/universalis';

import { getCheapestPerWorld, mapMarketData, matchesQuality } from './universalisMapper';

const response: UniversalisMarketResponse = {
    itemID: 5057,
    lastUploadTime: 1_700_000_000_000,
    listings: [
        {
            listingID: 'a',
            pricePerUnit: 80,
            quantity: 8,
            total: 640,
            hq: false,
            retainerName: 'Augrelt',
            lastReviewTime: 1_700_000_000,
            worldName: 'Spriggan',
        },
    ],
    recentHistory: [
        {
            pricePerUnit: 200,
            quantity: 5,
            total: 1000,
            hq: true,
            timestamp: 1_699_999_000,
            buyerName: '',
            worldName: 'Louisoix',
        },
    ],
    currentAveragePrice: 500,
    currentAveragePriceNQ: 400,
    currentAveragePriceHQ: 600,
    averagePrice: 268,
    averagePriceNQ: 252,
    averagePriceHQ: 0,
    minPrice: 80,
    minPriceNQ: 80,
    minPriceHQ: 0,
    regularSaleVelocity: 83,
    nqSaleVelocity: 41.4,
    hqSaleVelocity: 41.6,
};

describe('mapMarketData', () => {
    const data = mapMarketData(response);

    it('converts timestamps to milliseconds', () => {
        expect(data.lastUploadAt).toBe(1_700_000_000_000);
        expect(data.listings[0]?.reviewedAt).toBe(1_700_000_000_000);
        expect(data.sales[0]?.soldAt).toBe(1_699_999_000_000);
    });

    it('treats zero prices as unknown', () => {
        expect(data.stats.hq.minPrice).toBeNull();
        expect(data.stats.hq.averageSalePrice).toBeNull();
        expect(data.stats.nq).toEqual({ minPrice: 80, averageSalePrice: 252, saleVelocity: 41.4 });
    });

    it('normalises empty buyer names', () => {
        expect(data.sales[0]?.buyerName).toBeNull();
    });

    it('handles missing listings and history', () => {
        const empty = mapMarketData({ ...response, listings: [], recentHistory: [] });
        expect(empty.listings).toEqual([]);
        expect(empty.sales).toEqual([]);
    });
});

describe('matchesQuality', () => {
    it.each([
        ['all', false, true],
        ['all', true, true],
        ['nq', false, true],
        ['nq', true, false],
        ['hq', true, true],
        ['hq', false, false],
    ] as const)('quality %s with hq=%s → %s', (quality, hq, expected) => {
        expect(matchesQuality({ hq }, quality)).toBe(expected);
    });
});

describe('getCheapestPerWorld', () => {
    const listing = (worldName: string | null, pricePerUnit: number, hq = false): Listing => ({
        id: `${worldName}-${pricePerUnit}`,
        pricePerUnit,
        quantity: 1,
        total: pricePerUnit,
        hq,
        retainerName: 'Retainer',
        worldName,
        reviewedAt: 0,
    });

    const listings = [
        listing('Moogle', 120),
        listing('Omega', 100),
        listing('Moogle', 110),
        listing('Omega', 90, true),
        listing(null, 1),
    ];

    it('keeps the cheapest listing of each world, sorted by price', () => {
        expect(getCheapestPerWorld(listings, 'all')).toEqual([
            { worldName: 'Omega', pricePerUnit: 90, quantity: 1, hq: true, differencePercent: 0 },
            {
                worldName: 'Moogle',
                pricePerUnit: 110,
                quantity: 1,
                hq: false,
                differencePercent: 22,
            },
        ]);
    });

    it('applies the quality filter', () => {
        const worlds = getCheapestPerWorld(listings, 'nq');
        expect(worlds.map((world) => [world.worldName, world.pricePerUnit])).toEqual([
            ['Omega', 100],
            ['Moogle', 110],
        ]);
    });

    it('returns an empty list without listings', () => {
        expect(getCheapestPerWorld([], 'all')).toEqual([]);
    });
});
