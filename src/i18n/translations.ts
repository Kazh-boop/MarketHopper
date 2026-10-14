/**
 * UI strings. `en` is the reference: every other language must provide the same keys,
 * which is enforced at compile time by the `Translation` type.
 */

const plural = (count: number, singular: string, pluralForm: string): string =>
    count > 1 ? pluralForm : singular;

const en = {
    locale: 'en-US',
    screens: {
        Home: 'MarketHopper',
        ItemDetail: 'Item details',
        Settings: 'Settings',
    },
    common: {
        retry: 'Retry',
        showAll: (count: number) => `Show all (${count})`,
        showLess: 'Show less',
        hq: 'HQ',
        nq: 'NQ',
        gil: (amount: string) => `${amount} gil`,
        openSettings: 'Open settings',
        loading: 'Loading',
        back: 'Back',
    },
    errors: {
        title: 'Something went wrong',
        network: 'No connection. Check your network and try again.',
        timeout: 'The server took too long to respond.',
        notFound: 'No data found for this request.',
        rateLimited: 'Too many requests. Please wait a moment.',
        server: 'The service is temporarily unavailable.',
        unknown: 'An unexpected error occurred.',
    },
    time: {
        justNow: 'just now',
        minutesAgo: (n: number) => `${n} min ago`,
        hoursAgo: (n: number) => `${n} h ago`,
        daysAgo: (n: number) => `${n} ${plural(n, 'day', 'days')} ago`,
    },
    home: {
        searchPlaceholder: 'Search for an item…',
        searchHint: 'Type at least 2 characters',
        clearSearch: 'Clear search',
        noResultsTitle: 'No items found',
        noResults: (query: string) => `No marketable item matches “${query}”.`,
        endOfResults: 'No more results',
        favorites: 'Favorites',
        recentlyViewed: 'Recently viewed',
        clearHistory: 'Clear',
        welcomeTitle: 'Find the best price',
        welcomeDescription:
            'Search for an item to compare market board prices across the worlds of your data center.',
        marketLabel: 'Market',
        setupTitle: 'Choose your server',
        setupDescription: 'Select your region and data center to see market prices.',
        setupAction: 'Choose my server',
        changeMarket: 'Change market',
    },
    itemDetail: {
        level: (level: number) => `Item level ${level}`,
        addFavorite: 'Add to favorites',
        removeFavorite: 'Remove from favorites',
        openUniversalis: 'View on Universalis',
        quality: { all: 'All', nq: 'NQ', hq: 'HQ' },
        lowestPrice: 'Lowest',
        averageSale: 'Avg. sale',
        saleVelocity: 'Sales/day',
        cheapestWorlds: 'Cheapest worlds',
        cheapestWorldsHint: 'Lowest listing on each world',
        cheapest: 'Cheapest',
        listings: 'Listings',
        sales: 'Recent sales',
        noListings: 'Nothing for sale right now.',
        noSales: 'No recent sales.',
        updated: (when: string) => `Updated ${when}`,
        neverUpdated: 'No data uploaded yet',
        quantity: (n: number) => `×${n}`,
        total: (amount: string) => `Total ${amount}`,
        noScopeTitle: 'No server selected',
        noScopeDescription: 'Choose your data center to see the prices of this item.',
        scopeKinds: { world: 'World', dataCenter: 'Data center', region: 'Region' },
    },
    settings: {
        appearance: 'Appearance',
        theme: 'Theme',
        language: 'Language',
        market: 'Market',
        marketDescription:
            'Prices are compared across every world of the selected scope. Choose a world to only see its market.',
        region: 'Region',
        dataCenter: 'Data center',
        dataCenterHint: 'Select a region first',
        world: 'World',
        worldHint: 'Select a data center first',
        worldOptional: 'optional',
        currentScope: (name: string) => `Prices shown for: ${name}`,
        noScope: 'No market selected yet',
        about: 'About',
        dataSources: 'Item data by XIVAPI, market data by Universalis.',
        disclaimer:
            'FINAL FANTASY XIV © SQUARE ENIX CO., LTD. MarketHopper is not affiliated with Square Enix.',
        version: (version: string) => `Version ${version}`,
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
};

/** Same shape as `en`, with literal strings widened to `string`. */
type Widen<T> = T extends string
    ? string
    : T extends (...args: infer A) => infer R
      ? (...args: A) => R
      : { [K in keyof T]: Widen<T[K]> };

export type Translation = Widen<typeof en>;

const fr: Translation = {
    locale: 'fr-FR',
    screens: {
        Home: 'MarketHopper',
        ItemDetail: "Détails de l'objet",
        Settings: 'Paramètres',
    },
    common: {
        retry: 'Réessayer',
        showAll: (count) => `Tout afficher (${count})`,
        showLess: 'Afficher moins',
        hq: 'HQ',
        nq: 'NQ',
        gil: (amount) => `${amount} gils`,
        openSettings: 'Ouvrir les paramètres',
        loading: 'Chargement',
        back: 'Retour',
    },
    errors: {
        title: 'Une erreur est survenue',
        network: 'Pas de connexion. Vérifiez votre réseau et réessayez.',
        timeout: 'Le serveur a mis trop de temps à répondre.',
        notFound: 'Aucune donnée trouvée pour cette demande.',
        rateLimited: 'Trop de requêtes. Patientez quelques instants.',
        server: 'Le service est momentanément indisponible.',
        unknown: "Une erreur inattendue s'est produite.",
    },
    time: {
        justNow: "à l'instant",
        minutesAgo: (n) => `il y a ${n} min`,
        hoursAgo: (n) => `il y a ${n} h`,
        daysAgo: (n) => `il y a ${n} ${plural(n, 'jour', 'jours')}`,
    },
    home: {
        searchPlaceholder: 'Rechercher un objet…',
        searchHint: 'Saisissez au moins 2 caractères',
        clearSearch: 'Effacer la recherche',
        noResultsTitle: 'Aucun objet trouvé',
        noResults: (query) => `Aucun objet vendable ne correspond à « ${query} ».`,
        endOfResults: 'Fin des résultats',
        favorites: 'Favoris',
        recentlyViewed: 'Consultés récemment',
        clearHistory: 'Effacer',
        welcomeTitle: 'Trouvez le meilleur prix',
        welcomeDescription:
            'Recherchez un objet pour comparer les prix du marché entre les mondes de votre centre de données.',
        marketLabel: 'Marché',
        setupTitle: 'Choisissez votre serveur',
        setupDescription:
            'Sélectionnez votre région et votre centre de données pour afficher les prix.',
        setupAction: 'Choisir mon serveur',
        changeMarket: 'Changer de marché',
    },
    itemDetail: {
        level: (level) => `Niveau d'objet ${level}`,
        addFavorite: 'Ajouter aux favoris',
        removeFavorite: 'Retirer des favoris',
        openUniversalis: 'Voir sur Universalis',
        quality: { all: 'Tous', nq: 'NQ', hq: 'HQ' },
        lowestPrice: 'Prix min.',
        averageSale: 'Vente moy.',
        saleVelocity: 'Ventes/jour',
        cheapestWorlds: 'Mondes les moins chers',
        cheapestWorldsHint: 'Annonce la moins chère de chaque monde',
        cheapest: 'Le moins cher',
        listings: 'Annonces',
        sales: 'Ventes récentes',
        noListings: 'Rien en vente pour le moment.',
        noSales: 'Aucune vente récente.',
        updated: (when) => `Mis à jour ${when}`,
        neverUpdated: 'Aucune donnée envoyée pour le moment',
        quantity: (n) => `×${n}`,
        total: (amount) => `Total ${amount}`,
        noScopeTitle: 'Aucun serveur sélectionné',
        noScopeDescription: 'Choisissez votre centre de données pour voir les prix de cet objet.',
        scopeKinds: { world: 'Monde', dataCenter: 'Centre de données', region: 'Région' },
    },
    settings: {
        appearance: 'Apparence',
        theme: 'Thème',
        language: 'Langue',
        market: 'Marché',
        marketDescription:
            'Les prix sont comparés entre tous les mondes de la zone choisie. Choisissez un monde pour ne voir que son marché.',
        region: 'Région',
        dataCenter: 'Centre de données',
        dataCenterHint: "Sélectionnez d'abord une région",
        world: 'Monde',
        worldHint: "Sélectionnez d'abord un centre de données",
        worldOptional: 'facultatif',
        currentScope: (name) => `Prix affichés pour : ${name}`,
        noScope: 'Aucun marché sélectionné',
        about: 'À propos',
        dataSources: 'Données des objets : XIVAPI. Données du marché : Universalis.',
        disclaimer:
            "FINAL FANTASY XIV © SQUARE ENIX CO., LTD. MarketHopper n'est pas affilié à Square Enix.",
        version: (version) => `Version ${version}`,
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
};

export const translations = { en, fr } satisfies Record<string, Translation>;

export type Language = keyof typeof translations;

export const LANGUAGES: readonly { value: Language; label: string }[] = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' },
];

/** Picks the device language when supported, English otherwise. */
export function getDeviceLanguage(): Language {
    try {
        const locale = Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase();
        return locale.startsWith('fr') ? 'fr' : 'en';
    } catch {
        return 'en';
    }
}
