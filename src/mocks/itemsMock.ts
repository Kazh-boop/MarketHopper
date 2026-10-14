import { buildAssetUrl } from '@/mappers/xivapiMapper';
import type { Item, ItemSearchPage } from '@/types/item';
import { delay } from '@/utils/delay';

const MOCK_PAGE_SIZE = 10;
const MOCK_LATENCY_MS = 300;

function mockItem(
    id: number,
    name: string,
    iconId: number,
    category: string,
    level: number,
    canBeHq: boolean,
    rarity = 1,
): Item {
    const folder = String(Math.floor(iconId / 1000) * 1000).padStart(6, '0');
    const file = String(iconId).padStart(6, '0');
    return {
        id,
        name,
        iconUrl: buildAssetUrl(`ui/icon/${folder}/${file}.tex`),
        iconHdUrl: buildAssetUrl(`ui/icon/${folder}/${file}_hr1.tex`),
        rarity,
        category,
        level,
        canBeHq,
    };
}

export const MOCK_ITEMS: Item[] = [
    mockItem(2, 'Éclat de feu', 20001, 'Cristal', 1, false),
    mockItem(3, 'Éclat de glace', 20002, 'Cristal', 1, false),
    mockItem(4, 'Éclat de vent', 20003, 'Cristal', 1, false),
    mockItem(5, 'Éclat de terre', 20004, 'Cristal', 1, false),
    mockItem(6, 'Éclat de foudre', 20005, 'Cristal', 1, false),
    mockItem(7, "Éclat d'eau", 20006, 'Cristal', 1, false),
    mockItem(8, 'Cristal de feu', 20007, 'Cristal', 1, false),
    mockItem(9, 'Cristal de glace', 20008, 'Cristal', 1, false),
    mockItem(10, 'Cristal de vent', 20009, 'Cristal', 1, false),
    mockItem(11, 'Cristal de terre', 20010, 'Cristal', 1, false),
    mockItem(12, 'Cristal de foudre', 20011, 'Cristal', 1, false),
    mockItem(13, "Cristal d'eau", 20012, 'Cristal', 1, false),
    mockItem(5057, 'Lingot de fer', 20801, 'Métal', 14, true),
    mockItem(33933, 'Matéria stratégique IX', 20211, 'Matéria', 560, false, 3),
    mockItem(36080, "Épée longue d'Achéron", 30113, 'Arme de gladiateur', 590, true, 2),
    mockItem(38261, 'Tarte au melon', 24083, 'Plat', 610, true),
    mockItem(4550, 'Potion', 20601, 'Médicament', 10, true),
];

/** Mimics the XIVAPI search (case-insensitive "contains every word") with cursor pagination. */
export async function searchMockItems(
    query: string,
    cursor: string | null,
): Promise<ItemSearchPage> {
    await delay(MOCK_LATENCY_MS);

    const words = query.toLocaleLowerCase().split(' ');
    const matches = MOCK_ITEMS.filter((item) => {
        const name = item.name.toLocaleLowerCase();
        return words.every((word) => name.includes(word));
    });

    const offset = cursor ? Number(cursor) : 0;
    const nextOffset = offset + MOCK_PAGE_SIZE;
    return {
        items: matches.slice(offset, nextOffset),
        nextCursor: nextOffset < matches.length ? String(nextOffset) : null,
    };
}
