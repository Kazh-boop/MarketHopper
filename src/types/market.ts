/** Market data, as displayed by the app (normalised from Universalis). */

export type Quality = 'all' | 'nq' | 'hq';

export interface Listing {
    id: string;
    pricePerUnit: number;
    quantity: number;
    total: number;
    hq: boolean;
    retainerName: string;
    /** World where the listing is, `null` when the scope is a single world. */
    worldName: string | null;
    /** Last time the listing was seen, epoch milliseconds. */
    reviewedAt: number;
}

export interface Sale {
    pricePerUnit: number;
    quantity: number;
    total: number;
    hq: boolean;
    worldName: string | null;
    buyerName: string | null;
    /** Epoch milliseconds. */
    soldAt: number;
}

export interface PriceStats {
    /** Lowest listing price, `null` when nothing is for sale. */
    minPrice: number | null;
    /** Average price of recent sales, `null` without history. */
    averageSalePrice: number | null;
    /** Average number of units sold per day. */
    saleVelocity: number;
}

export interface MarketData {
    itemId: number;
    /** Epoch milliseconds, `null` when the item was never uploaded. */
    lastUploadAt: number | null;
    listings: Listing[];
    sales: Sale[];
    stats: Record<Quality, PriceStats>;
}

/** Cheapest offer found on a world, used by the world comparison. */
export interface WorldPrice {
    worldName: string;
    pricePerUnit: number;
    quantity: number;
    hq: boolean;
    /** Price difference with the cheapest world, in percent (0 for the cheapest). */
    differencePercent: number;
}
