/**
 * Profile Screen
 * Pantalla de perfil del usuario
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    useColorScheme,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/auth';

export default function ProfileScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const { user, tenantSlug, logout, isLoading } = useAuthStore();

    const handleLogout = () => {
        Alert.alert(
            'Cerrar Sesión',
            '¿Estás seguro que deseas cerrar sesión?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Cerrar Sesión',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        Mi Perfil
                    </Text>
                </View>

                <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                    <View style={styles.infoRow}>
                        <Text style={[styles.label, { color: colors.textSecondary }]}>
                            Nombre
                        </Text>
                        <Text style={[styles.value, { color: colors.text }]}>
                            {user?.name || 'N/A'}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={[styles.label, { color: colors.textSecondary }]}>
                            Teléfono
                        </Text>
                        <Text style={[styles.value, { color: colors.text }]}>
                            {user?.phone || 'N/A'}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={[styles.label, { color: colors.textSecondary }]}>
                            Email
                        </Text>
                        <Text style={[styles.value, { color: colors.text }]}>
                            {user?.email || 'No especificado'}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={[styles.label, { color: colors.textSecondary }]}>
                            Negocio
                        </Text>
                        <Text style={[styles.value, { color: colors.text }]}>
                            {tenantSlug || 'N/A'}
                        </Text>
                    </View>
                </View>

                <View style={styles.actions}>
                    <Button
                        title="Cerrar Sesión"
                        variant="outline"
                        onPress={handleLogout}
                        loading={isLoading}
                        fullWidth
                    />
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
    },
    card: {
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 24,
    },
    infoRow: {
        paddingVertical: 12,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    actions: {
        marginTop: 16,
    },
});
