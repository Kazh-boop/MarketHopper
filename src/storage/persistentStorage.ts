import AsyncStorage from '@react-native-async-storage/async-storage';

import { logger } from '@/utils/logger';

/**
 * JSON wrapper around AsyncStorage. Failures are logged and never thrown:
 * losing a preference must not crash the app.
 */
export const persistentStorage = {
    async read(key: string): Promise<unknown> {
        try {
            const raw = await AsyncStorage.getItem(key);
            return raw === null ? null : (JSON.parse(raw) as unknown);
        } catch (error) {
            logger.warn(`[Storage] Unable to read "${key}"`, error);
            return null;
        }
    },

    async write(key: string, value: unknown): Promise<void> {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            logger.warn(`[Storage] Unable to write "${key}"`, error);
        }
    },
};
