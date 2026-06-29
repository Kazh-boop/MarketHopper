import React from "react";
import { Appbar, useTheme } from "react-native-paper";
import { StackHeaderProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useSettings } from "@/context/SettingsContext";
import { useTranslation } from "@/i18n/useTranslation";
import type { RootStackParamList } from "@/navigation/AppNavigator";

export default function CustomNavigationBar({
    navigation,
    route,
    back,
}: StackHeaderProps) {
    const theme = useTheme();
    const nav = useNavigation();
    const t = useTranslation();

    const isOnSettings = route.name === "Settings";

    // Translate title from route name
    const title = t.screens[route.name as keyof typeof t.screens] ?? route.name;

    return (
        <Appbar.Header
            style={{ backgroundColor: theme.colors.surface, elevation: 0 }}
        >
            {back ? (
                <Appbar.BackAction
                    onPress={navigation.goBack}
                    color={theme.colors.onSurface}
                />
            ) : null}

            <Appbar.Content
                title={title}
                titleStyle={{
                    color: back ? theme.colors.onSurface : theme.colors.primary,
                    fontWeight: "bold",
                    fontSize: back ? 18 : 20,
                }}
            />

            {!isOnSettings && (
                <Appbar.Action
                    icon="cog"
                    onPress={() => nav.navigate("Settings")}
                    color={theme.colors.onSurface}
                />
            )}
        </Appbar.Header>
    );
}
