import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { AppHeader } from '@/components/AppHeader';
import HomeScreen from '@/screens/HomeScreen';
import ItemDetailScreen from '@/screens/ItemDetailScreen';
import SettingsScreen from '@/screens/SettingsScreen';

import type { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ header: (props) => <AppHeader {...props} /> }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    );
}
