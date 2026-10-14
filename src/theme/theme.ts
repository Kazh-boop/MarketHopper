import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper';

export type ThemeName = 'midnight' | 'parchment' | 'ocean' | 'forest' | 'crimson';

interface Palette {
    dark: boolean;
    primary: string;
    background: string;
    surface: string;
    onSurface: string;
    onSurfaceVariant: string;
    outline: string;
}

const PALETTES: Record<ThemeName, Palette> = {
    midnight: {
        dark: true,
        primary: '#D4B373',
        background: '#131315',
        surface: '#242428',
        onSurface: '#E1E1E6',
        onSurfaceVariant: '#A2A2A8',
        outline: '#3A3A40',
    },
    parchment: {
        dark: false,
        primary: '#8B6914',
        background: '#F4F0E6',
        surface: '#FDFAF2',
        onSurface: '#1A1A0E',
        onSurfaceVariant: '#5C5C50',
        outline: '#D0C8A8',
    },
    ocean: {
        dark: true,
        primary: '#5BA8D0',
        background: '#080F1A',
        surface: '#0F1E30',
        onSurface: '#C8DCF0',
        onSurfaceVariant: '#7F9DB8',
        outline: '#1A3558',
    },
    forest: {
        dark: true,
        primary: '#5EAD6E',
        background: '#090F09',
        surface: '#101E10',
        onSurface: '#C3DFC5',
        onSurfaceVariant: '#7D9F7D',
        outline: '#1A3A1A',
    },
    crimson: {
        dark: true,
        primary: '#D45858',
        background: '#130808',
        surface: '#221010',
        onSurface: '#EDD0D0',
        onSurfaceVariant: '#B07C7C',
        outline: '#4A1515',
    },
};

/** Ordered list used by the theme picker. */
export const THEME_NAMES: readonly ThemeName[] = [
    'midnight',
    'parchment',
    'ocean',
    'forest',
    'crimson',
];

export function isThemeName(value: unknown): value is ThemeName {
    return typeof value === 'string' && (THEME_NAMES as readonly string[]).includes(value);
}

export function getThemePalette(name: ThemeName): Palette {
    return PALETTES[name];
}

/** Mixes two `#RRGGBB` colors; `ratio` is the weight of `to` (0 → `from`, 1 → `to`). */
export function mixColors(from: string, to: string, ratio: number): string {
    const parse = (hex: string) =>
        [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16));
    const a = parse(from);
    const b = parse(to);
    const mixed = a.map((channel, index) =>
        Math.round(channel + ((b[index] ?? channel) - channel) * ratio)
            .toString(16)
            .padStart(2, '0'),
    );
    return `#${mixed.join('')}`.toUpperCase();
}

function createTheme(palette: Palette): MD3Theme {
    const base = palette.dark ? MD3DarkTheme : MD3LightTheme;
    const onPrimary = palette.dark ? palette.background : '#FFFFFF';
    const container = mixColors(palette.surface, palette.primary, palette.dark ? 0.25 : 0.18);
    const surfaceVariant = mixColors(palette.surface, palette.onSurface, 0.06);
    const elevate = (ratio: number) => mixColors(palette.surface, palette.primary, ratio);

    return {
        ...base,
        dark: palette.dark,
        colors: {
            ...base.colors,
            primary: palette.primary,
            onPrimary,
            primaryContainer: container,
            onPrimaryContainer: palette.onSurface,
            secondary: palette.primary,
            onSecondary: onPrimary,
            secondaryContainer: container,
            onSecondaryContainer: palette.onSurface,
            background: palette.background,
            onBackground: palette.onSurface,
            surface: palette.surface,
            onSurface: palette.onSurface,
            surfaceVariant,
            onSurfaceVariant: palette.onSurfaceVariant,
            outline: palette.outline,
            outlineVariant: palette.outline,
            inverseSurface: palette.onSurface,
            inverseOnSurface: palette.surface,
            inversePrimary: palette.primary,
            elevation: {
                level0: 'transparent',
                level1: elevate(0.04),
                level2: elevate(0.07),
                level3: elevate(0.1),
                level4: elevate(0.12),
                level5: elevate(0.14),
            },
        },
    };
}

const THEMES: Record<ThemeName, MD3Theme> = {
    midnight: createTheme(PALETTES.midnight),
    parchment: createTheme(PALETTES.parchment),
    ocean: createTheme(PALETTES.ocean),
    forest: createTheme(PALETTES.forest),
    crimson: createTheme(PALETTES.crimson),
};

export function getTheme(name: ThemeName): MD3Theme {
    return THEMES[name];
}
