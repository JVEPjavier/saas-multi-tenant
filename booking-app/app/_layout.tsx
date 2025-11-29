/**
 * Root Layout
 * Layout principal de la aplicación
 */

import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '@/store/auth';

export default function RootLayout() {
    const router = useRouter();
    const segments = useSegments();
    const { isAuthenticated, isLoading, loadPersistedAuth } = useAuthStore();

    // Cargar auth persistida al montar
    useEffect(() => {
        loadPersistedAuth();
    }, []);

    // Manejar redirecciones basadas en autenticación
    useEffect(() => {
        if (isLoading) return;

        const inAuthGroup = segments[0] === '(auth)';

        // Defer navigation to next tick to ensure router is mounted
        const timeoutId = setTimeout(() => {
            if (!isAuthenticated && !inAuthGroup) {
                // Usuario no autenticado, redirigir a auth
                router.replace('/(auth)/select-tenant');
            } else if (isAuthenticated && inAuthGroup) {
                // Usuario autenticado, redirigir a tabs
                router.replace('/(tabs)');
            }
        }, 0);

        return () => clearTimeout(timeoutId);
    }, [isAuthenticated, isLoading, segments]);

    return (
        <>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                    name="appointment/[id]"
                    options={{
                        headerShown: true,
                        title: 'Detalle de Cita',
                        presentation: 'modal'
                    }}
                />
            </Stack>
        </>
    );
}
