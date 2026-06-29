// utils/mapper.ts
import { ItemSearchResult } from '../types/xivapi';
import { Item } from '../types/item';

export const mapXIVAPIItem = (raw: ItemSearchResult): Item => ({
    id: raw.row_id,
    name: raw.fields.Name,
    iconUrl: `https://v2.xivapi.com/api/asset/${raw.fields.Icon.path}?format=png`,
    rarity: raw.fields.Rarity,
    category: raw.fields.ItemSearchCategory?.fields.Name ?? 'Divers',
    level: raw.fields.LevelItem?.value ?? 0,
});