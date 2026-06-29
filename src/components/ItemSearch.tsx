import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Keyboard, Image } from "react-native";
import { Searchbar, List, Text, useTheme } from "react-native-paper";
import { searchItems } from "@/services/itemService";
import { Item } from "@/types/item";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "@/i18n/useTranslation";

export default function ItemSearch() {
    const theme = useTheme();
    const navigation = useNavigation();
    const t = useTranslation();

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [results, setResults] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (searchQuery.length < 2) {
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            setIsLoading(true);
            try {
                const data = await searchItems(searchQuery);
                setResults(data);
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(fetchResults, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const handlePressItem = (item: Item) => {
        Keyboard.dismiss();
        navigation.navigate("ItemDetail", { item });
    };

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder={t.home.searchPlaceholder}
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchbar}
                loading={isLoading}
                placeholderTextColor={theme.colors.onSurfaceVariant}
                iconColor={theme.colors.primary}
            />

            {results.length > 0 ? (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id.toString()}
                    keyboardShouldPersistTaps="handled"
                    style={styles.list}
                    renderItem={({ item }) => (
                        <List.Item
                            title={item.name}
                            titleStyle={{ color: theme.colors.onSurface }}
                            description={`ID: ${item.id}`}
                            descriptionStyle={{
                                color: theme.colors.onSurfaceVariant,
                            }}
                            left={() => (
                                <View style={styles.iconWrapper}>
                                    <Image
                                        source={{ uri: item.iconUrl }}
                                        style={styles.iconStyle}
                                    />
                                </View>
                            )}
                            onPress={() => handlePressItem(item)}
                            style={[
                                styles.listItem,
                                {
                                    backgroundColor: theme.colors.surface,
                                    borderColor: theme.colors.outline,
                                },
                            ]}
                        />
                    )}
                />
            ) : (
                searchQuery.length >= 2 &&
                !isLoading && (
                    <Text
                        style={[
                            styles.emptyText,
                            { color: theme.colors.onSurfaceVariant },
                        ]}
                    >
                        {t.home.noResults}
                    </Text>
                )
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { width: "100%" },
    searchbar: { margin: 16, borderRadius: 4 },
    list: { maxHeight: 300 },
    listItem: { borderBottomWidth: 1, paddingHorizontal: 16 },
    emptyText: { textAlign: "center", marginTop: 10 },
    iconWrapper: {
        justifyContent: "center",
        alignItems: "center",
        width: 48,
        marginRight: 8,
    },
    iconStyle: { width: 40, height: 40, borderRadius: 4 },
});
