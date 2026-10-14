import { XIVAPI_URL } from '@/config/env';
import type { Item } from '@/types/item';
import type { XivapiSearchResult } from '@/types/xivapi';

/** Builds the URL of a game texture converted to PNG by XIVAPI. */
export function buildAssetUrl(texturePath: string): string {
    return `${XIVAPI_URL}/asset?path=${encodeURIComponent(texturePath)}&format=png`;
}

export function mapXivapiItem(raw: XivapiSearchResult): Item {
    const { fields } = raw;
    return {
        id: raw.row_id,
        name: fields.Name,
        iconUrl: buildAssetUrl(fields.Icon.path),
        iconHdUrl: buildAssetUrl(fields.Icon.path_hr1),
        rarity: fields.Rarity,
        category: fields.ItemSearchCategory?.fields?.Name || null,
        level: fields['LevelItem@as(raw)'] ?? 0,
        canBeHq: fields.CanBeHq,
    };
}

/**
 * Builds an XIVAPI query matching items whose name contains every word of the input
 * and that can be sold on the market board.
 */
export function buildItemSearchQuery(input: string): string {
    const words = input
        .replace(/["\\]/g, ' ')
        .split(/\s+/)
        .filter((word) => word.length > 0);
    const nameClauses = words.map((word) => `+Name~"${word}"`);
    return [...nameClauses, '+ItemSearchCategory>=1'].join(' ');
}
