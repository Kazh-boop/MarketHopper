import type { XivapiSearchResult } from '@/types/xivapi';

import { buildAssetUrl, buildItemSearchQuery, mapXivapiItem } from './xivapiMapper';

const rawItem: XivapiSearchResult = {
    score: 1,
    sheet: 'Item',
    row_id: 5057,
    fields: {
        Name: 'Lingot de fer',
        Rarity: 1,
        CanBeHq: true,
        Icon: {
            id: 20801,
            path: 'ui/icon/020000/020801.tex',
            path_hr1: 'ui/icon/020000/020801_hr1.tex',
        },
        'LevelItem@as(raw)': 14,
        ItemSearchCategory: { value: 48, fields: { Name: 'Métal' } },
    },
};

describe('buildAssetUrl', () => {
    it('builds a PNG asset URL with an encoded path', () => {
        expect(buildAssetUrl('ui/icon/020000/020801.tex')).toBe(
            'https://v2.xivapi.com/api/asset?path=ui%2Ficon%2F020000%2F020801.tex&format=png',
        );
    });
});

describe('mapXivapiItem', () => {
    it('maps every field of a search result', () => {
        expect(mapXivapiItem(rawItem)).toEqual({
            id: 5057,
            name: 'Lingot de fer',
            iconUrl: buildAssetUrl('ui/icon/020000/020801.tex'),
            iconHdUrl: buildAssetUrl('ui/icon/020000/020801_hr1.tex'),
            rarity: 1,
            category: 'Métal',
            level: 14,
            canBeHq: true,
        });
    });

    it('falls back when optional fields are missing', () => {
        const {
            ItemSearchCategory: _category,
            'LevelItem@as(raw)': _level,
            ...fields
        } = rawItem.fields;
        const item = mapXivapiItem({ ...rawItem, fields });
        expect(item.category).toBeNull();
        expect(item.level).toBe(0);
    });
});

describe('buildItemSearchQuery', () => {
    it('requires every word and restricts to marketable items', () => {
        expect(buildItemSearchQuery('lingot  fer')).toBe(
            '+Name~"lingot" +Name~"fer" +ItemSearchCategory>=1',
        );
    });

    it('strips characters that would break the query syntax', () => {
        expect(buildItemSearchQuery('a"b\\c')).toBe(
            '+Name~"a" +Name~"b" +Name~"c" +ItemSearchCategory>=1',
        );
    });
});
