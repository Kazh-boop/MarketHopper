/** An item of the game, as displayed by the app. */
export interface Item {
    id: number;
    name: string;
    /** Small icon (40x40). */
    iconUrl: string;
    /** High resolution icon (80x80), used on the detail screen. */
    iconHdUrl: string;
    rarity: number;
    /** Market board category, `null` when unknown. */
    category: string | null;
    level: number;
    canBeHq: boolean;
}

/** A page of search results. `nextCursor` is `null` when there is nothing left to load. */
export interface ItemSearchPage {
    items: Item[];
    nextCursor: string | null;
}
