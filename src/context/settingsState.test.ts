import { parseStoredSettings, selectRegion, toggleDataCenter, toggleWorld } from './settingsState';

describe('parseStoredSettings', () => {
    it('rejects non-object values', () => {
        expect(parseStoredSettings(null)).toBeNull();
        expect(parseStoredSettings('dark')).toBeNull();
    });

    it('keeps valid settings', () => {
        const stored = {
            themeName: 'ocean',
            language: 'fr',
            market: { region: 'EU', dataCenter: 'Chaos', world: 'Moogle' },
        };
        expect(parseStoredSettings(stored)).toEqual(stored);
    });

    it('drops values that are no longer valid', () => {
        const parsed = parseStoredSettings({
            themeName: 'neon',
            language: 'xx',
            market: { region: 'NA', dataCenter: 'Dynamis', world: 'Syldra' },
        });
        expect(parsed?.themeName).toBe('midnight');
        expect(['en', 'fr']).toContain(parsed?.language);
        expect(parsed?.market).toEqual({ region: 'NA', dataCenter: 'Dynamis', world: null });
    });

    it('drops a data center that does not belong to the region', () => {
        const parsed = parseStoredSettings({ market: { region: 'JP', dataCenter: 'Chaos' } });
        expect(parsed?.market).toEqual({ region: 'JP', dataCenter: null, world: null });
    });
});

describe('market selection', () => {
    const chaos = { region: 'EU', dataCenter: 'Chaos', world: 'Moogle' } as const;

    it('resets the data center and world when the region changes', () => {
        expect(selectRegion(chaos, 'NA')).toEqual({ region: 'NA', dataCenter: null, world: null });
    });

    it('keeps everything when the same region is selected again', () => {
        expect(selectRegion(chaos, 'EU')).toBe(chaos);
    });

    it('toggles the data center and resets the world', () => {
        expect(toggleDataCenter(chaos, 'Light')).toEqual({
            region: 'EU',
            dataCenter: 'Light',
            world: null,
        });
        expect(toggleDataCenter(chaos, 'Chaos')).toEqual({
            region: 'EU',
            dataCenter: null,
            world: null,
        });
    });

    it('toggles the world', () => {
        expect(toggleWorld(chaos, 'Moogle').world).toBeNull();
        expect(toggleWorld(chaos, 'Omega').world).toBe('Omega');
    });
});
