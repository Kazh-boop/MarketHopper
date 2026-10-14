import type { Item } from '@/types/item';

import { prependUnique } from './ItemCollectionsContext';

const item = (id: number): Item => ({
    id,
    name: `Item ${id}`,
    iconUrl: '',
    iconHdUrl: '',
    rarity: 1,
    category: null,
    level: 1,
    canBeHq: false,
});

describe('prependUnique', () => {
    it('moves an existing item to the top', () => {
        const result = prependUnique([item(1), item(2), item(3)], item(3), 10);
        expect(result.map(({ id }) => id)).toEqual([3, 1, 2]);
    });

    it('caps the list size', () => {
        const result = prependUnique([item(1), item(2)], item(3), 2);
        expect(result.map(({ id }) => id)).toEqual([3, 1]);
    });
});
