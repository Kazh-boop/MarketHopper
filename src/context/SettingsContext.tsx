import React, { createContext, useContext, useState } from 'react';
import type { ThemeName } from '@/theme/theme';
import type { Language } from '@/i18n/translations';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UniversalisPrefs {
    /** 'NA' | 'EU' | 'JP' | 'OC' | '' */
    region: string;
    /** e.g. 'Chaos', 'Aether' — empty if none selected */
    dataCenter: string;
    /** specific world name — empty if none selected */
    world: string;
}

interface SettingsContextType {
    themeName: ThemeName;
    setThemeName: (name: ThemeName) => void;
    language: Language;
    setLanguage: (lang: Language) => void;
    universalisPrefs: UniversalisPrefs;
    setUniversalisPrefs: (prefs: Partial<UniversalisPrefs>) => void;
    /** Derived shortcut for components that only need dark/light */
    isDark: boolean;
    /** Legacy toggle kept for backward compat — cycles between midnight ↔ parchment */
    toggleTheme: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const SettingsContext = createContext<SettingsContextType>({
    themeName: 'midnight',
    setThemeName: () => {},
    language: 'fr',
    setLanguage: () => {},
    universalisPrefs: { region: '', dataCenter: '', world: '' },
    setUniversalisPrefs: () => {},
    isDark: true,
    toggleTheme: () => {},
});

export const useSettings = () => useContext(SettingsContext);

/** @deprecated Use useSettings instead */
export const useThemeMode = useSettings;

// ─── Provider ─────────────────────────────────────────────────────────────────

const DARK_THEMES: ThemeName[] = ['midnight', 'ocean', 'forest', 'crimson'];

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [themeName, setThemeName] = useState<ThemeName>('midnight');
    const [language, setLanguage] = useState<Language>('fr');
    const [universalisPrefs, setUniversalisPrefsState] = useState<UniversalisPrefs>({
        region: '',
        dataCenter: '',
        world: '',
    });

    const setUniversalisPrefs = (prefs: Partial<UniversalisPrefs>) => {
        setUniversalisPrefsState((prev) => ({ ...prev, ...prefs }));
    };

    const isDark = DARK_THEMES.includes(themeName);

    const toggleTheme = () =>
        setThemeName((prev) => (prev === 'midnight' ? 'parchment' : 'midnight'));

    return (
        <SettingsContext.Provider
            value={{
                themeName,
                setThemeName,
                language,
                setLanguage,
                universalisPrefs,
                setUniversalisPrefs,
                isDark,
                toggleTheme,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}
