/**
 * Data centers and worlds supported by the app (global client only).
 * Source: https://universalis.app/api/v2/data-centers and /worlds.
 */

export type Region = 'NA' | 'EU' | 'JP' | 'OC';

export interface DataCenterInfo {
    id: string;
    region: Region;
    worlds: readonly string[];
}

export const REGIONS: readonly Region[] = ['EU', 'NA', 'JP', 'OC'];

/** Region identifiers expected by the Universalis API. */
export const UNIVERSALIS_REGION_NAMES: Record<Region, string> = {
    NA: 'North-America',
    EU: 'Europe',
    JP: 'Japan',
    OC: 'Oceania',
};

export const DATA_CENTERS: readonly DataCenterInfo[] = [
    {
        id: 'Aether',
        region: 'NA',
        worlds: [
            'Adamantoise',
            'Cactuar',
            'Faerie',
            'Gilgamesh',
            'Jenova',
            'Midgardsormr',
            'Sargatanas',
            'Siren',
        ],
    },
    {
        id: 'Crystal',
        region: 'NA',
        worlds: [
            'Balmung',
            'Brynhildr',
            'Coeurl',
            'Diabolos',
            'Goblin',
            'Malboro',
            'Mateus',
            'Zalera',
        ],
    },
    {
        id: 'Dynamis',
        region: 'NA',
        worlds: [
            'Cuchulainn',
            'Golem',
            'Halicarnassus',
            'Kraken',
            'Maduin',
            'Marilith',
            'Rafflesia',
            'Seraph',
        ],
    },
    {
        id: 'Primal',
        region: 'NA',
        worlds: [
            'Behemoth',
            'Excalibur',
            'Exodus',
            'Famfrit',
            'Hyperion',
            'Lamia',
            'Leviathan',
            'Ultros',
        ],
    },
    {
        id: 'Chaos',
        region: 'EU',
        worlds: [
            'Cerberus',
            'Louisoix',
            'Moogle',
            'Omega',
            'Phantom',
            'Ragnarok',
            'Sagittarius',
            'Spriggan',
        ],
    },
    {
        id: 'Light',
        region: 'EU',
        worlds: ['Alpha', 'Lich', 'Odin', 'Phoenix', 'Raiden', 'Shiva', 'Twintania', 'Zodiark'],
    },
    {
        id: 'Elemental',
        region: 'JP',
        worlds: [
            'Aegis',
            'Atomos',
            'Carbuncle',
            'Garuda',
            'Gungnir',
            'Kujata',
            'Tonberry',
            'Typhon',
        ],
    },
    {
        id: 'Gaia',
        region: 'JP',
        worlds: [
            'Alexander',
            'Bahamut',
            'Durandal',
            'Fenrir',
            'Ifrit',
            'Ridill',
            'Tiamat',
            'Ultima',
        ],
    },
    {
        id: 'Mana',
        region: 'JP',
        worlds: [
            'Anima',
            'Asura',
            'Chocobo',
            'Hades',
            'Ixion',
            'Masamune',
            'Pandaemonium',
            'Titan',
        ],
    },
    {
        id: 'Meteor',
        region: 'JP',
        worlds: [
            'Belias',
            'Mandragora',
            'Ramuh',
            'Shinryu',
            'Unicorn',
            'Valefor',
            'Yojimbo',
            'Zeromus',
        ],
    },
    {
        id: 'Materia',
        region: 'OC',
        worlds: ['Bismarck', 'Ravana', 'Sephirot', 'Sophia', 'Zurvan'],
    },
];

export function getDataCentersByRegion(region: Region | null): readonly DataCenterInfo[] {
    return region ? DATA_CENTERS.filter((dc) => dc.region === region) : [];
}

export function getWorldsByDataCenter(dataCenter: string | null): readonly string[] {
    return DATA_CENTERS.find((dc) => dc.id === dataCenter)?.worlds ?? [];
}
