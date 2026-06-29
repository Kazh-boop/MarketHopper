import { IS_MOCK } from '@/config/env';
import { MOCK_ITEMS } from '@/mocks/itemsMock';
import { itemRepository } from '@/repositories/itemRepository';
import { Item } from '@/types/item';

/**
 * Service de recherche d'objets.
 * Valide la requête, aiguille le flux (Mock ou API) et normalise les données pour l'UI.
 */
export const searchItems = async (query: string): Promise<Item[]> => {
    if (!query || query.trim().length < 2) {
        return [];
    }

    const normalizedQuery = query.toLowerCase().trim();
    let rawData: any[] = [];

    if (IS_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 300)); // Simulation latence réseau

        rawData = MOCK_ITEMS.filter(item =>
            item.name.toLowerCase().includes(normalizedQuery)
        );
    } else {
        try {
            rawData = await itemRepository.search(normalizedQuery);
        } catch (error) {
            return [];
        }
    }
    return rawData;
};