import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text, useTheme, Surface } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ItemSearch from "@/components/ItemSearch";
import { useTranslation } from "@/i18n/useTranslation";
import { Item } from "@/types/item";

export default function HomeScreen() {
    const theme = useTheme();
    const navigation = useNavigation();
    const t = useTranslation();

    return (
        <Surface style={styles.container}>
            <ItemSearch />

            <Surface style={styles.actionContainer}>
                <Text
                    variant="titleMedium"
                    style={{ color: theme.colors.onSurface, marginBottom: 12 }}
                >
                    {t.home.shortcuts}
                </Text>
                <Button
                    mode="outlined"
                    icon="earth"
                    textColor={theme.colors.primary}
                    style={{
                        borderColor: theme.colors.outline,
                        borderRadius: 4,
                    }}
                    onPress={() => navigation.navigate("Settings")}
                >
                    {t.home.configureRegion}
                </Button>
            </Surface>
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    actionContainer: { padding: 16, marginTop: 20 },
});
