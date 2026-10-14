import { useCallback, useEffect, useRef, useState } from 'react';

import { persistentStorage } from '@/storage/persistentStorage';

type SetStateAction<T> = T | ((previous: T) => T);

/**
 * `useState` persisted in AsyncStorage.
 *
 * @param key storage key
 * @param defaultValue value used until hydration, or when nothing valid is stored
 * @param parse validates the stored value (it may come from an older version of the app).
 *        Must be a stable reference (e.g. a module-level function).
 * @returns the value, its setter and whether the stored value has been loaded
 */
export function usePersistentState<T>(
    key: string,
    defaultValue: T,
    parse: (stored: unknown) => T | null,
): [T, (action: SetStateAction<T>) => void, boolean] {
    const [value, setValue] = useState<T>(defaultValue);
    const [isHydrated, setIsHydrated] = useState(false);
    /** Set when the user changes the value before hydration, so it is not overwritten. */
    const hasLocalChange = useRef(false);

    useEffect(() => {
        let isCancelled = false;
        persistentStorage.read(key).then((stored) => {
            if (isCancelled) {
                return;
            }
            const parsed = stored === null ? null : parse(stored);
            if (parsed !== null && !hasLocalChange.current) {
                setValue(parsed);
            }
            setIsHydrated(true);
        });
        return () => {
            isCancelled = true;
        };
    }, [key, parse]);

    useEffect(() => {
        if (isHydrated) {
            void persistentStorage.write(key, value);
        }
    }, [key, value, isHydrated]);

    const update = useCallback((action: SetStateAction<T>) => {
        hasLocalChange.current = true;
        setValue(action);
    }, []);

    return [value, update, isHydrated];
}
