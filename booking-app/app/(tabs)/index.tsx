/**
 * Home Screen
 * Pantalla principal - Mis próximas citas
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useAuthStore } from '@/store/auth';

export default function HomeScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const { user } = useAuthStore();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.greeting, { color: colors.text }]}>
                        Hola, {user?.name || 'Usuario'}! 👋
                    </Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Tus próximas citas
                    </Text>
                </View>

                <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                    <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                        No tienes citas próximas
                    </Text>
                    <Text style={[styles.emptySubtext, { color: colors.textMuted }]}>
                        Reserva una cita desde la pestaña "Reservar"
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 24,
    },
    header: {
        marginBottom: 24,
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
    },
    card: {
        padding: 24,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        textAlign: 'center',
    },
});
