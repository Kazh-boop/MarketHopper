import { DATA_CENTERS, REGIONS, type Region } from '@/constants/universalis';
import { getDeviceLanguage, translations, type Language } from '@/i18n/translations';
import { isThemeName } from '@/theme/theme';
import type { MarketPreferences, Settings } from '@/types/settings';

export const createDefaultSettings = (): Settings => ({
    themeName: 'midnight',
    language: getDeviceLanguage(),
    market: { region: null, dataCenter: null, world: null },
});

const isRegion = (value: unknown): value is Region =>
    typeof value === 'string' && (REGIONS as readonly string[]).includes(value);

const isLanguage = (value: unknown): value is Language =>
    typeof value === 'string' && value in translations;

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null;

/**
 * Validates settings read from storage. Invalid or outdated values (e.g. a world that
 * no longer exists) fall back to the defaults instead of breaking the app.
 */
export function parseStoredSettings(stored: unknown): Settings | null {
    if (!isRecord(stored)) {
        return null;
    }
    const defaults = createDefaultSettings();
    const market = isRecord(stored.market) ? stored.market : {};

    const region = isRegion(market.region) ? market.region : null;
    const dataCenter = DATA_CENTERS.find(
        (dc) => dc.id === market.dataCenter && dc.region === region,
    );
    const world =
        dataCenter && typeof market.world === 'string' && dataCenter.worlds.includes(market.world)
            ? market.world
            : null;

    return {
        themeName: isThemeName(stored.themeName) ? stored.themeName : defaults.themeName,
        language: isLanguage(stored.language) ? stored.language : defaults.language,
        market: { region, dataCenter: dataCenter?.id ?? null, world },
    };
}

/** Selecting a region resets the data center and the world, which belong to it. */
export function selectRegion(market: MarketPreferences, region: Region): MarketPreferences {
    if (market.region === region) {
        return market;
    }
    return { region, dataCenter: null, world: null };
}

/** Selecting the active data center again unselects it. */
export function toggleDataCenter(market: MarketPreferences, dataCenter: string): MarketPreferences {
    return {
        ...market,
        dataCenter: market.dataCenter === dataCenter ? null : dataCenter,
        world: null,
    };
}

/** Selecting the active world again unselects it (back to data center level). */
export function toggleWorld(market: MarketPreferences, world: string): MarketPreferences {
    return { ...market, world: market.world === world ? null : world };
}
