import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { Item } from '@/types/item';
import { useTranslation } from '@/i18n/useTranslation';

export default function ItemDetailScreen() {
    const route = useRoute();
    const t = useTranslation();

    const { item } = route.params as { item: Item };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Avatar.Image size={80} source={{ uri: item.iconUrl }} />
                <Text variant="headlineMedium" style={styles.title}>
                    {item.name}
                </Text>
                <Text variant="bodyLarge">{t.itemDetail.category} : {item.category}</Text>
                <Text variant="bodyMedium">{t.itemDetail.level} : {item.level}</Text>

                <View style={styles.marketContainer}>
                    <Text variant="titleMedium">{t.itemDetail.marketTitle}</Text>
                    <Text>{t.itemDetail.marketPending}</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: 16, alignItems: 'center' },
    title: { marginVertical: 16, textAlign: 'center' },
    marketContainer: {
        marginTop: 32,
        width: '100%',
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
    },
});
