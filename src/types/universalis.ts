/**
 * Raw response types of the Universalis v2 API (https://docs.universalis.app).
 * Timestamps are in seconds for listings / sales and in milliseconds for `lastUploadTime`.
 */

export interface UniversalisListing {
    listingID: string;
    pricePerUnit: number;
    quantity: number;
    total: number;
    hq: boolean;
    retainerName: string;
    lastReviewTime: number;
    onMannequin?: boolean;
    /** Only present when querying a data center or a region. */
    worldName?: string;
    worldID?: number;
}

export interface UniversalisSale {
    pricePerUnit: number;
    quantity: number;
    total: number;
    hq: boolean;
    timestamp: number;
    buyerName?: string;
    onMannequin?: boolean;
    /** Only present when querying a data center or a region. */
    worldName?: string;
    worldID?: number;
}

export interface UniversalisMarketResponse {
    itemID: number;
    lastUploadTime: number;
    listings: UniversalisListing[];
    recentHistory: UniversalisSale[];
    worldName?: string;
    dcName?: string;
    regionName?: string;
    currentAveragePrice: number;
    currentAveragePriceNQ: number;
    currentAveragePriceHQ: number;
    averagePrice: number;
    averagePriceNQ: number;
    averagePriceHQ: number;
    minPrice: number;
    minPriceNQ: number;
    minPriceHQ: number;
    regularSaleVelocity: number;
    nqSaleVelocity: number;
    hqSaleVelocity: number;
    listingsCount?: number;
    unitsForSale?: number;
    unitsSold?: number;
    hasData?: boolean;
}
