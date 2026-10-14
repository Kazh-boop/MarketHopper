import { focusManager } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AppState, Platform, type AppStateStatus } from 'react-native';

/**
 * Tells React Query when the app comes back to the foreground, so stale market
 * data is refreshed automatically. (The web already relies on window focus.)
 */
export function useAppStateFocus(): void {
    useEffect(() => {
        if (Platform.OS === 'web') {
            return;
        }
        const subscription = AppState.addEventListener('change', (status: AppStateStatus) => {
            focusManager.setFocused(status === 'active');
        });
        return () => subscription.remove();
    }, []);
}
