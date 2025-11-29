/**
 * Not Found Screen
 * Pantalla 404
 */

import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function NotFoundScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>
                404
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Página no encontrada
            </Text>
            <Link href="/(tabs)" style={[styles.link, { color: colors.primary }]}>
                Volver al inicio
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    title: {
        fontSize: 72,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 24,
    },
    link: {
        fontSize: 16,
        fontWeight: '600',
    },
});
