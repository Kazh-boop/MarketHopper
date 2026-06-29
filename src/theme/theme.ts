import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

// ─── Theme definitions ────────────────────────────────────────────────────────

const midnightTheme = {
    ...MD3DarkTheme,
    dark: true,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#D4B373',
        background: '#131315',
        surface: '#242428',
        onSurface: '#E1E1E6',
        onSurfaceVariant: '#9A9A9F',
        outline: '#3A3A40',
        elevation: { ...MD3DarkTheme.colors.elevation, level3: '#2A2A30' },
    },
};

const parchmentTheme = {
    ...MD3LightTheme,
    dark: false,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#8B6914',
        background: '#F4F0E6',
        surface: '#FDFAF2',
        onSurface: '#1A1A0E',
        onSurfaceVariant: '#65655A',
        outline: '#D0C8A8',
        elevation: { ...MD3LightTheme.colors.elevation, level3: '#EDE9D8' },
    },
};

const oceanTheme = {
    ...MD3DarkTheme,
    dark: true,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#5BA8D0',
        background: '#080F1A',
        surface: '#0F1E30',
        onSurface: '#C8DCF0',
        onSurfaceVariant: '#5E7D99',
        outline: '#1A3558',
        elevation: { ...MD3DarkTheme.colors.elevation, level3: '#132540' },
    },
};

const forestTheme = {
    ...MD3DarkTheme,
    dark: true,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#5EAD6E',
        background: '#090F09',
        surface: '#101E10',
        onSurface: '#C3DFC5',
        onSurfaceVariant: '#567856',
        outline: '#1A3A1A',
        elevation: { ...MD3DarkTheme.colors.elevation, level3: '#132813' },
    },
};

const crimsonTheme = {
    ...MD3DarkTheme,
    dark: true,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#C44848',
        background: '#130808',
        surface: '#221010',
        onSurface: '#EDD0D0',
        onSurfaceVariant: '#8C5555',
        outline: '#4A1515',
        elevation: { ...MD3DarkTheme.colors.elevation, level3: '#2E1414' },
    },
};

// ─── Public API ───────────────────────────────────────────────────────────────

export type ThemeName = 'midnight' | 'parchment' | 'ocean' | 'forest' | 'crimson';

export interface ThemeMeta {
    name: ThemeName;
    primary: string;
    background: string;
    surface: string;
    isDark: boolean;
}

/** Ordered list used by the theme picker */
export const THEME_LIST: ThemeMeta[] = [
    { name: 'midnight', primary: '#D4B373', background: '#131315', surface: '#242428', isDark: true },
    { name: 'parchment', primary: '#8B6914', background: '#F4F0E6', surface: '#FDFAF2', isDark: false },
    { name: 'ocean',    primary: '#5BA8D0', background: '#080F1A', surface: '#0F1E30', isDark: true },
    { name: 'forest',   primary: '#5EAD6E', background: '#090F09', surface: '#101E10', isDark: true },
    { name: 'crimson',  primary: '#C44848', background: '#130808', surface: '#221010', isDark: true },
];

export function getTheme(name: ThemeName) {
    switch (name) {
        case 'parchment': return parchmentTheme;
        case 'ocean':     return oceanTheme;
        case 'forest':    return forestTheme;
        case 'crimson':   return crimsonTheme;
        default:          return midnightTheme;
    }
}

// Kept for any file that still imports them by name
export const darkTheme  = midnightTheme;
export const lightTheme = parchmentTheme;
export const theme      = midnightTheme;
