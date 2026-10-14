# MarketHopper

Application mobile (Expo / React Native) pour comparer les prix du **tableau des ventes de
FINAL FANTASY XIV** entre les mondes d'un centre de données, et savoir où « hopper » pour
acheter moins cher.

- Recherche d'objets vendables (XIVAPI v2), dans la langue de l'application, avec pagination infinie
- Fiche objet : prix minimum, vente moyenne, ventes par jour, filtre NQ / HQ
- **Mondes les moins chers** : l'annonce la moins chère de chaque monde, triée, avec l'écart en %
- Annonces et ventes récentes (Universalis), tirer pour rafraîchir
- Favoris et objets consultés récemment
- Paramètres persistants : région / centre de données / monde, 5 thèmes, français / anglais
- États de chargement, d'erreur (avec « Réessayer ») et vides partout ; libellés d'accessibilité

## Démarrer

```bash
npm install
npm start          # puis i (iOS), a (Android) ou w (web)
```

Sans réseau, ou pour développer l'interface, utilisez les données simulées :

```bash
cp .env.example .env   # puis EXPO_PUBLIC_MOCK=true
npx expo start --clear # --clear est nécessaire après un changement de variable EXPO_PUBLIC_*
```

## Scripts

| Commande            | Rôle                                         |
| ------------------- | -------------------------------------------- |
| `npm run typecheck` | Vérification TypeScript (strict)             |
| `npm run lint`      | ESLint (config Expo + Prettier)              |
| `npm run format`    | Formate tout le code avec Prettier           |
| `npm test`          | Tests unitaires et de composants (Jest)      |
| `npm run validate`  | Typecheck + lint + tests (à lancer avant PR) |

## Architecture

```
src/
├── api/            Clients HTTP (Axios), normalisation des erreurs, React Query
├── components/     Composants UI (common, items, market, settings)
├── config/         Variables d'environnement
├── constants/      Centres de données / mondes, clés de stockage
├── context/        Paramètres et collections (favoris, historique), persistés
├── hooks/          useItemSearch, useMarketData, usePersistentState…
├── i18n/           Traductions typées (fr, en)
├── mappers/        Réponses API brutes → modèles de l'app (testés)
├── mocks/          Données simulées (EXPO_PUBLIC_MOCK=true)
├── navigation/     Stack navigator et types des routes
├── repositories/   Accès aux API (XIVAPI, Universalis)
├── screens/        Accueil, Détails de l'objet, Paramètres
├── services/       Règles métier, aiguillage mock / API
├── theme/          Thèmes Material 3 et échelle d'espacement
├── types/          Types des API et du domaine
└── utils/          Formatage (gil, temps relatif), logger
```

Flux des données : `screen → hook (React Query) → service → repository → client HTTP`, puis
`mapper` pour convertir la réponse. Les écrans ne connaissent ni Axios ni le format des API.

## Conventions

- TypeScript strict (`noUncheckedIndexedAccess`), pas de `any`, imports de types explicites
- Prettier : 4 espaces, guillemets simples, 100 colonnes (voir `.prettierrc.json` et `.editorconfig`)
- Imports absolus via l'alias `@/` → `src/`
- Toute chaîne visible passe par `src/i18n/translations.ts` (le type impose les mêmes clés en `fr` et `en`)
- Les données stockées sont validées au chargement (`parseStoredSettings`) : une ancienne valeur
  invalide ne fait jamais planter l'app

## Sources de données

- Objets : [XIVAPI v2](https://v2.xivapi.com)
- Marché : [Universalis](https://universalis.app)

FINAL FANTASY XIV © SQUARE ENIX CO., LTD. MarketHopper n'est pas affilié à Square Enix.
