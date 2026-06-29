import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@/screens/HomeScreen';
import ItemDetailScreen from '@/screens/ItemDetailScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import CustomNavigationBar from '@/components/CustomNavigationBar';
import { Item } from '@/types/item';

export type RootStackParamList = {
    Home: undefined;
    ItemDetail: { item: Item };
    Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                header: (props) => <CustomNavigationBar {...props} />,
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    );
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
