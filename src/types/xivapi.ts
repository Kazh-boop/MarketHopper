export interface ItemSearchResult {
    row_id: number;
    fields: {
        Name: string;
        Rarity: number;
        Icon: { path: string };
        ItemSearchCategory?: {
            fields: { Name: string };
        };
        LevelItem?: {
            value: number;
        };
    }
}

export interface ItemSearchResultResponse {
    results: ItemSearchResult[];
} 