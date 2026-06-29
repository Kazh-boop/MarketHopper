import { xivapiClient } from '@/api/axiosClient';
import { Item } from '@/types/item';
import { mapXIVAPIItem } from '@/mapper/xivapi';
import { ItemSearchResultResponse, ItemSearchResult } from '@/types/xivapi';

export const itemRepository = {
    /**
     * Effectue la recherche sur XIVAPI pour récupérer la liste des objets recherchés
     */
    search: async (query: string): Promise<Item[]> => {
        const names = query.split(" ").map(word => `+Name~"${word}"`).join(" ");
        const complexQuery = `${names} +ItemSearchCategory>=1`
        const response = await xivapiClient.get(`/search`, {
            params: {
                sheets: 'Item',
                query: complexQuery,
                limit: 10,
                language: 'fr',
                fields: 'Name,ItemSearchCategory.Name,Icon,LevelItem.todo,Rarity'
            }
        });
        const data: ItemSearchResultResponse = response.data || [];

        return data.results.map((result: ItemSearchResult) => mapXIVAPIItem(result));
    }
};