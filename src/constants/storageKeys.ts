/** AsyncStorage keys. Bump the version suffix when the stored shape changes incompatibly. */
export const STORAGE_KEYS = {
    settings: '@markethopper/settings/v1',
    favorites: '@markethopper/favorites/v1',
    recentItems: '@markethopper/recent-items/v1',
} as const;
