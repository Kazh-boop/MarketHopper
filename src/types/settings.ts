import type { Region } from '@/constants/universalis';
import type { Language } from '@/i18n/translations';
import type { ThemeName } from '@/theme/theme';

export interface MarketPreferences {
    region: Region | null;
    dataCenter: string | null;
    /** Optional: the data center level is enough to compare worlds. */
    world: string | null;
}

export interface Settings {
    themeName: ThemeName;
    language: Language;
    market: MarketPreferences;
}

export type MarketScopeKind = 'world' | 'dataCenter' | 'region';

/** The area Universalis is queried for, derived from the market preferences. */
export interface MarketScope {
    kind: MarketScopeKind;
    /** Identifier sent to the Universalis API. */
    target: string;
    /** Human readable name (world, data center or region code). */
    name: string;
}
