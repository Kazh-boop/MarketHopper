import type { Listing, MarketData, PriceStats, Quality, Sale, WorldPrice } from '@/types/market';
import type {
    UniversalisListing,
    UniversalisMarketResponse,
    UniversalisSale,
} from '@/types/universalis';

const SECOND_MS = 1000;

/** Universalis reports `0` when a value is unknown. */
const nullIfZero = (value: number): number | null => (value > 0 ? value : null);

export function mapListing(raw: UniversalisListing): Listing {
    return {
        id: raw.listingID,
        pricePerUnit: raw.pricePerUnit,
        quantity: raw.quantity,
        total: raw.total,
        hq: raw.hq,
        retainerName: raw.retainerName,
        worldName: raw.worldName ?? null,
        reviewedAt: raw.lastReviewTime * SECOND_MS,
    };
}

export function mapSale(raw: UniversalisSale): Sale {
    return {
        pricePerUnit: raw.pricePerUnit,
        quantity: raw.quantity,
        total: raw.total,
        hq: raw.hq,
        worldName: raw.worldName ?? null,
        buyerName: raw.buyerName || null,
        soldAt: raw.timestamp * SECOND_MS,
    };
}

export function mapMarketData(raw: UniversalisMarketResponse): MarketData {
    const stats: Record<Quality, PriceStats> = {
        all: {
            minPrice: nullIfZero(raw.minPrice),
            averageSalePrice: nullIfZero(raw.averagePrice),
            saleVelocity: raw.regularSaleVelocity,
        },
        nq: {
            minPrice: nullIfZero(raw.minPriceNQ),
            averageSalePrice: nullIfZero(raw.averagePriceNQ),
            saleVelocity: raw.nqSaleVelocity,
        },
        hq: {
            minPrice: nullIfZero(raw.minPriceHQ),
            averageSalePrice: nullIfZero(raw.averagePriceHQ),
            saleVelocity: raw.hqSaleVelocity,
        },
    };

    return {
        itemId: raw.itemID,
        lastUploadAt: nullIfZero(raw.lastUploadTime),
        listings: (raw.listings ?? []).map(mapListing),
        sales: (raw.recentHistory ?? []).map(mapSale),
        stats,
    };
}

export function matchesQuality(entry: { hq: boolean }, quality: Quality): boolean {
    return quality === 'all' || (quality === 'hq') === entry.hq;
}

/**
 * Keeps the cheapest listing of each world and sorts worlds from cheapest to most expensive.
 * This is the core of "world hopping": it tells the player where to travel to buy.
 */
export function getCheapestPerWorld(listings: Listing[], quality: Quality): WorldPrice[] {
    const cheapestByWorld = new Map<string, Listing>();

    for (const listing of listings) {
        if (!listing.worldName || !matchesQuality(listing, quality)) {
            continue;
        }
        const current = cheapestByWorld.get(listing.worldName);
        if (!current || listing.pricePerUnit < current.pricePerUnit) {
            cheapestByWorld.set(listing.worldName, listing);
        }
    }

    const sorted = [...cheapestByWorld.entries()].sort(
        ([, a], [, b]) => a.pricePerUnit - b.pricePerUnit,
    );
    const bestPrice = sorted[0]?.[1].pricePerUnit ?? 0;

    return sorted.map(([worldName, listing]) => ({
        worldName,
        pricePerUnit: listing.pricePerUnit,
        quantity: listing.quantity,
        hq: listing.hq,
        differencePercent:
            bestPrice > 0 ? Math.round(((listing.pricePerUnit - bestPrice) / bestPrice) * 100) : 0,
    }));
}
