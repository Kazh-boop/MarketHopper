import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationLightTheme,
    NavigationContainer,
    type Theme as NavigationTheme,
} from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, type MD3Theme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createQueryClient } from '@/api/queryClient';
import { ItemCollectionsProvider } from '@/context/ItemCollectionsContext';
import { SettingsProvider, useSettings } from '@/context/SettingsContext';
import { useAppStateFocus } from '@/hooks/useAppStateFocus';
import AppNavigator from '@/navigation/AppNavigator';
import { getTheme } from '@/theme/theme';

/** Derives the React Navigation theme from the Paper theme so both stay in sync. */
function createNavigationTheme(paperTheme: MD3Theme): NavigationTheme {
    const base = paperTheme.dark ? NavigationDarkTheme : NavigationLightTheme;
    return {
        ...base,
        colors: {
            ...base.colors,
            primary: paperTheme.colors.primary,
            background: paperTheme.colors.background,
            card: paperTheme.colors.surface,
            text: paperTheme.colors.onSurface,
            border: paperTheme.colors.outline,
            notification: paperTheme.colors.error,
        },
    };
}

function ThemedApp() {
    const { settings, isHydrated } = useSettings();
    const paperTheme = getTheme(settings.themeName);
    const navigationTheme = useMemo(() => createNavigationTheme(paperTheme), [paperTheme]);

    // Avoid flashing the default theme before the stored preferences are loaded.
    if (!isHydrated) {
        return null;
    }

    return (
        <PaperProvider theme={paperTheme}>
            <StatusBar style={paperTheme.dark ? 'light' : 'dark'} />
            <NavigationContainer theme={navigationTheme}>
                <AppNavigator />
            </NavigationContainer>
        </PaperProvider>
    );
}

export default function App() {
    const [queryClient] = useState(createQueryClient);
    useAppStateFocus();

    return (
        <GestureHandlerRootView style={styles.root}>
            <SafeAreaProvider>
                <QueryClientProvider client={queryClient}>
                    <SettingsProvider>
                        <ItemCollectionsProvider>
                            <ThemedApp />
                        </ItemCollectionsProvider>
                    </SettingsProvider>
                </QueryClientProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});
