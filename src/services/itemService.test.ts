import { itemRepository } from '@/repositories/itemRepository';

import { isSearchQueryValid, normalizeSearchQuery, searchItems } from './itemService';

jest.mock('@/repositories/itemRepository', () => ({
    itemRepository: { search: jest.fn() },
}));

const search = itemRepository.search as jest.MockedFunction<typeof itemRepository.search>;

describe('itemService', () => {
    beforeEach(() => search.mockReset());

    it('normalises whitespace', () => {
        expect(normalizeSearchQuery('  iron   ingot ')).toBe('iron ingot');
    });

    it('requires at least two characters', () => {
        expect(isSearchQueryValid(' a ')).toBe(false);
        expect(isSearchQueryValid('ab')).toBe(true);
    });

    it('does not call the API for too short queries', async () => {
        await expect(searchItems('a', 'en')).resolves.toEqual({ items: [], nextCursor: null });
        expect(search).not.toHaveBeenCalled();
    });

    it('forwards the normalised query, the language and the cursor', async () => {
        const page = { items: [], nextCursor: 'next' };
        search.mockResolvedValue(page);

        await expect(searchItems(' iron  ingot ', 'fr', 'cursor')).resolves.toBe(page);
        expect(search).toHaveBeenCalledWith({
            query: 'iron ingot',
            language: 'fr',
            cursor: 'cursor',
        });
    });

    it('propagates API errors so the UI can display them', async () => {
        search.mockRejectedValue(new Error('offline'));
        await expect(searchItems('iron', 'en')).rejects.toThrow('offline');
    });
});
