export const translations = {
    en: {
        screens: {
            Home: 'MarketHopper',
            ItemDetail: 'Item Details',
            Settings: 'Settings',
        },
        home: {
            shortcuts: 'Shortcuts & Preferences',
            configureRegion: 'Configure my default Region',
            searchPlaceholder: 'Search for an item (e.g.: Crystal...)',
            noResults: 'No items found.',
        },
        settings: {
            appearance: 'Appearance',
            theme: 'Theme',
            language: 'Language',
            universalis: 'Universalis Preferences',
            region: 'Region',
            dataCenter: 'Data Center',
            dataCenterHint: 'Select a region first',
            world: 'World',
            worldHint: 'Select a data center first',
            worldOptional: '(optional — data center level is sufficient)',
            themes: {
                midnight: 'Midnight',
                parchment: 'Parchment',
                ocean: 'Ocean',
                forest: 'Forest',
                crimson: 'Crimson',
            },
            regions: {
                NA: 'North America',
                EU: 'Europe',
                JP: 'Japan',
                OC: 'Oceania',
            },
        },
        itemDetail: {
            category: 'Category',
            level: 'Level',
            marketTitle: 'Market (Universalis)',
            marketPending: 'Loading data…',
        },
    },
    fr: {
        screens: {
            Home: 'MarketHopper',
            ItemDetail: "Détails de l'objet",
            Settings: 'Paramètres',
        },
        home: {
            shortcuts: 'Raccourcis & Préférences',
            configureRegion: 'Configurer ma Région par défaut',
            searchPlaceholder: 'Rechercher un objet (ex: Éclat…)',
            noResults: 'Aucun objet trouvé.',
        },
        settings: {
            appearance: 'Apparence',
            theme: 'Thème',
            language: 'Langue',
            universalis: 'Préférences Universalis',
            region: 'Région',
            dataCenter: 'Centre de données',
            dataCenterHint: 'Sélectionnez une région d\'abord',
            world: 'Monde',
            worldHint: 'Sélectionnez un centre de données d\'abord',
            worldOptional: '(optionnel — le niveau datacenter suffit)',
            themes: {
                midnight: 'Minuit',
                parchment: 'Parchemin',
                ocean: 'Océan',
                forest: 'Forêt',
                crimson: 'Cramoisi',
            },
            regions: {
                NA: 'Amérique du Nord',
                EU: 'Europe',
                JP: 'Japon',
                OC: 'Océanie',
            },
        },
        itemDetail: {
            category: 'Catégorie',
            level: 'Niveau',
            marketTitle: 'Marché (Universalis)',
            marketPending: 'En attente des données…',
        },
    },
} as const;

export type Translations = typeof translations;
export type Language = keyof Translations;
