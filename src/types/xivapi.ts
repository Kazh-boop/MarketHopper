/**
 * Raw response types of XIVAPI v2 (https://v2.xivapi.com/api/docs).
 * Only the fields requested by the app are typed.
 */

export interface XivapiIcon {
    id: number;
    path: string;
    path_hr1: string;
}

export interface XivapiItemFields {
    Name: string;
    Rarity: number;
    CanBeHq: boolean;
    Icon: XivapiIcon;
    'LevelItem@as(raw)'?: number;
    ItemSearchCategory?: {
        value: number;
        fields?: { Name?: string };
    };
}

export interface XivapiSearchResult {
    score: number;
    sheet: string;
    row_id: number;
    fields: XivapiItemFields;
}

export interface XivapiSearchResponse {
    next?: string;
    schema: string;
    version?: string;
    results: XivapiSearchResult[];
}

/** Languages supported by XIVAPI. */
export type XivapiLanguage = 'en' | 'fr' | 'de' | 'ja';
