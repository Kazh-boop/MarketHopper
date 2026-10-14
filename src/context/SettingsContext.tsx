import React, { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';

import { STORAGE_KEYS } from '@/constants/storageKeys';
import type { Region } from '@/constants/universalis';
import { usePersistentState } from '@/hooks/usePersistentState';
import type { Language } from '@/i18n/translations';
import type { ThemeName } from '@/theme/theme';
import type { MarketScope, Settings } from '@/types/settings';
import { getMarketScope } from '@/utils/marketScope';

import {
    createDefaultSettings,
    parseStoredSettings,
    selectRegion,
    toggleDataCenter,
    toggleWorld,
} from './settingsState';

interface SettingsContextValue {
    settings: Settings;
    /** `false` until the stored settings have been loaded. */
    isHydrated: boolean;
    /** Market area used to query prices, `null` until the user picks one. */
    marketScope: MarketScope | null;
    setThemeName: (themeName: ThemeName) => void;
    setLanguage: (language: Language) => void;
    selectRegion: (region: Region) => void;
    toggleDataCenter: (dataCenter: string) => void;
    toggleWorld: (world: string) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

const DEFAULT_SETTINGS = createDefaultSettings();

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings, isHydrated] = usePersistentState(
        STORAGE_KEYS.settings,
        DEFAULT_SETTINGS,
        parseStoredSettings,
    );

    const setThemeName = useCallback(
        (themeName: ThemeName) => setSettings((prev) => ({ ...prev, themeName })),
        [setSettings],
    );
    const setLanguage = useCallback(
        (language: Language) => setSettings((prev) => ({ ...prev, language })),
        [setSettings],
    );
    const handleSelectRegion = useCallback(
        (region: Region) =>
            setSettings((prev) => ({ ...prev, market: selectRegion(prev.market, region) })),
        [setSettings],
    );
    const handleToggleDataCenter = useCallback(
        (dataCenter: string) =>
            setSettings((prev) => ({ ...prev, market: toggleDataCenter(prev.market, dataCenter) })),
        [setSettings],
    );
    const handleToggleWorld = useCallback(
        (world: string) =>
            setSettings((prev) => ({ ...prev, market: toggleWorld(prev.market, world) })),
        [setSettings],
    );

    const marketScope = useMemo(() => getMarketScope(settings.market), [settings.market]);

    const value = useMemo<SettingsContextValue>(
        () => ({
            settings,
            isHydrated,
            marketScope,
            setThemeName,
            setLanguage,
            selectRegion: handleSelectRegion,
            toggleDataCenter: handleToggleDataCenter,
            toggleWorld: handleToggleWorld,
        }),
        [
            settings,
            isHydrated,
            marketScope,
            setThemeName,
            setLanguage,
            handleSelectRegion,
            handleToggleDataCenter,
            handleToggleWorld,
        ],
    );

    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
