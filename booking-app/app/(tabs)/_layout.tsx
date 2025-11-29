/**
 * Tabs Layout
 * Layout con navegación por tabs
 */

import { Tabs } from 'expo-router';
import { Text, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function TabsLayout() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.tabIconSelected,
                tabBarInactiveTintColor: colors.tabIconDefault,
                tabBarStyle: {
                    backgroundColor: colors.tabBar,
                    borderTopColor: colors.tabBarBorder,
                },
                headerStyle: {
                    backgroundColor: colors.background,
                },
                headerTintColor: colors.text,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="services"
                options={{
                    title: 'Servicios',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="list" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="booking"
                options={{
                    title: 'Reservar',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="calendar" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="person" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

// Simple icon component (puedes reemplazar con Ionicons u otra librería)
function TabBarIcon({ name, color }: { name: string; color: string }) {
    const icons: Record<string, string> = {
        home: '🏠',
        list: '📋',
        calendar: '📅',
        person: '👤',
    };

    return (
        <Text style={{ fontSize: 24, color }}>{icons[name] || '•'}</Text>
    );
}

