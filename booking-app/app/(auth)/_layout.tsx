/**
 * Auth Layout
 * Layout para pantallas de autenticación
 */

import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#FFFFFF' },
            }}
        >
            <Stack.Screen name="select-tenant" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
        </Stack>
    );
}
