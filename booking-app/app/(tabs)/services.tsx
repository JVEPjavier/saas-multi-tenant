/**
 * Services Screen
 * Pantalla de lista de servicios
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

export default function ServicesScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        Servicios Disponibles
                    </Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Explora nuestros servicios
                    </Text>
                </View>

                <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                    <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                        Cargando servicios...
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
