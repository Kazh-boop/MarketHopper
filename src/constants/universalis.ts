export type Region = 'NA' | 'EU' | 'JP' | 'OC';

export interface DataCenterInfo {
    id: string;
    region: Region;
    worlds: string[];
}

export const REGIONS: Region[] = ['NA', 'EU', 'JP', 'OC'];

export const DATA_CENTERS: DataCenterInfo[] = [
    {
        id: 'Aether', region: 'NA',
        worlds: ['Adamantoise', 'Cactuar', 'Faerie', 'Gilgamesh', 'Jenova', 'Midgardsormr', 'Sargatanas', 'Siren'],
    },
    {
        id: 'Crystal', region: 'NA',
        worlds: ['Balmung', 'Brynhildr', 'Coeurl', 'Diabolos', 'Goblin', 'Malboro', 'Mateus', 'Zalera'],
    },
    {
        id: 'Dynamis', region: 'NA',
        worlds: ['Cuchulainn', 'Golem', 'Halicarnassus', 'Kraken', 'Maduin', 'Marilith', 'Seraph', 'Syldra'],
    },
    {
        id: 'Primal', region: 'NA',
        worlds: ['Behemoth', 'Excalibur', 'Exodus', 'Famfrit', 'Hyperion', 'Lamia', 'Leviathan', 'Ultros'],
    },
    {
        id: 'Chaos', region: 'EU',
        worlds: ['Cerberus', 'Louisoix', 'Moogle', 'Omega', 'Phantom', 'Ragnarok', 'Sagittarius', 'Spriggan'],
    },
    {
        id: 'Light', region: 'EU',
        worlds: ['Alpha', 'Lich', 'Odin', 'Phoenix', 'Raiden', 'Shiva', 'Twintania', 'Zodiark'],
    },
    {
        id: 'Elemental', region: 'JP',
        worlds: ['Aegis', 'Atomos', 'Carbuncle', 'Garuda', 'Gungnir', 'Kujata', 'Tonberry', 'Typhon'],
    },
    {
        id: 'Gaia', region: 'JP',
        worlds: ['Alexander', 'Bahamut', 'Durandal', 'Fenrir', 'Ifrit', 'Ridill', 'Tiamat', 'Ultima'],
    },
    {
        id: 'Mana', region: 'JP',
        worlds: ['Anima', 'Asura', 'Chocobo', 'Hades', 'Ixion', 'Masamune', 'Pandaemonium', 'Titan'],
    },
    {
        id: 'Meteor', region: 'JP',
        worlds: ['Belias', 'Mandragora', 'Ramuh', 'Shinryu', 'Unicorn', 'Valefor', 'Yojimbo', 'Zeromus'],
    },
    {
        id: 'Materia', region: 'OC',
        worlds: ['Bismarck', 'Ravana', 'Sephirot', 'Sophia', 'Zurvan'],
    },
];
