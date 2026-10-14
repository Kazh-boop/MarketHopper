import { getMarketScope } from './marketScope';

describe('getMarketScope', () => {
    it('returns null when nothing is configured', () => {
        expect(getMarketScope({ region: null, dataCenter: null, world: null })).toBeNull();
    });

    it('uses the Universalis region name', () => {
        expect(getMarketScope({ region: 'NA', dataCenter: null, world: null })).toEqual({
            kind: 'region',
            target: 'North-America',
            name: 'NA',
        });
    });

    it('prefers the data center over the region', () => {
        expect(getMarketScope({ region: 'EU', dataCenter: 'Chaos', world: null })).toEqual({
            kind: 'dataCenter',
            target: 'Chaos',
            name: 'Chaos',
        });
    });

    it('prefers the world over everything', () => {
        expect(getMarketScope({ region: 'EU', dataCenter: 'Chaos', world: 'Moogle' })).toEqual({
            kind: 'world',
            target: 'Moogle',
            name: 'Moogle',
        });
    });
});
