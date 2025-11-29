/**
 * Booking Screen
 * Pantalla de nueva cita
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

export default function BookingScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        Nueva Reserva
                    </Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Selecciona servicio, profesional y horario
                    </Text>
                </View>

                <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                    <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                        Formulario de reserva en construcción
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
    title: {
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
    },
});
