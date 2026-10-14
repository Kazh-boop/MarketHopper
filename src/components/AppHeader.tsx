import type { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';

import { useTranslation } from '@/i18n/useTranslation';
import type { RootStackParamList } from '@/navigation/types';

/** Material header shared by every screen. Screens add actions through `options.headerRight`. */
export function AppHeader({ navigation, route, back, options }: StackHeaderProps) {
    const theme = useTheme();
    const t = useTranslation();
    const routeName = route.name as keyof RootStackParamList;
    const isHome = routeName === 'Home';

    return (
        <Appbar.Header style={{ backgroundColor: theme.colors.surface }} elevated={false}>
            {back ? (
                <Appbar.BackAction onPress={navigation.goBack} accessibilityLabel={t.common.back} />
            ) : null}
            <Appbar.Content
                title={t.screens[routeName]}
                titleStyle={{
                    color: isHome ? theme.colors.primary : theme.colors.onSurface,
                    fontWeight: '700',
                }}
            />
            {options.headerRight?.({ tintColor: theme.colors.onSurface, canGoBack: Boolean(back) })}
            {isHome ? (
                <Appbar.Action
                    icon="cog-outline"
                    onPress={() => navigation.navigate('Settings')}
                    accessibilityLabel={t.common.openSettings}
                />
            ) : null}
        </Appbar.Header>
    );
}
