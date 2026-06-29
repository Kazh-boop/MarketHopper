import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { adaptNavigationTheme, Provider as PaperProvider } from 'react-native-paper';
import {
    NavigationContainer,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import { getTheme } from '@/theme/theme';
import AppNavigator from '@/navigation/AppNavigator';
import { SettingsProvider, useSettings } from '@/context/SettingsContext';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

function AppContent() {
    const { themeName } = useSettings();

    const paperTheme = getTheme(themeName);
    const navBase = paperTheme.dark ? DarkTheme : LightTheme;

    const combinedTheme = {
        ...navBase,
        ...paperTheme,
        colors: {
            ...navBase.colors,
            ...paperTheme.colors,
        },
    };

    return (
        <PaperProvider theme={paperTheme}>
            <StatusBar barStyle={paperTheme.dark ? 'light-content' : 'dark-content'} />
            <NavigationContainer theme={combinedTheme}>
                <AppNavigator />
            </NavigationContainer>
        </PaperProvider>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <SettingsProvider>
                <AppContent />
            </SettingsProvider>
        </SafeAreaProvider>
    );
}
