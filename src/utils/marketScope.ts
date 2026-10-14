import { UNIVERSALIS_REGION_NAMES } from '@/constants/universalis';
import type { MarketPreferences, MarketScope } from '@/types/settings';

/**
 * Resolves the most precise market scope from the user preferences
 * (world > data center > region). Returns `null` when nothing is configured.
 */
export function getMarketScope(prefs: MarketPreferences): MarketScope | null {
    if (prefs.world) {
        return { kind: 'world', target: prefs.world, name: prefs.world };
    }
    if (prefs.dataCenter) {
        return { kind: 'dataCenter', target: prefs.dataCenter, name: prefs.dataCenter };
    }
    if (prefs.region) {
        return {
            kind: 'region',
            target: UNIVERSALIS_REGION_NAMES[prefs.region],
            name: prefs.region,
        };
    }
    return null;
}
