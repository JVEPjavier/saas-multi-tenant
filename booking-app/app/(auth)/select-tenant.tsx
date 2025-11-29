/**
 * Select Tenant Screen
 * Pantalla de selección de negocio
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/auth';

export default function SelectTenantScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const { setTenant } = useAuthStore();

    const [tenantSlug, setTenantSlugInput] = useState('');
    const [error, setError] = useState('');

    const handleContinue = async () => {
        setError('');

        if (!tenantSlug.trim()) {
            setError('Por favor ingresa el código del negocio');
            return;
        }

        // Validar formato (solo letras, números y guiones)
        const slugRegex = /^[a-z0-9-]+$/;
        if (!slugRegex.test(tenantSlug)) {
            setError('El código solo puede contener letras minúsculas, números y guiones');
            return;
        }

        await setTenant(tenantSlug.toLowerCase());
        router.push('/(auth)/login');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.text }]}>
                            Bienvenido
                        </Text>
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                            Ingresa el código de tu negocio para continuar
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <Input
                            label="Código del Negocio"
                            placeholder="mi-negocio"
                            value={tenantSlug}
                            onChangeText={(text) => {
                                setTenantSlugInput(text.toLowerCase());
                                setError('');
                            }}
                            error={error}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <Button
                            title="Continuar"
                            onPress={handleContinue}
                            fullWidth
                        />
                    </View>

                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: colors.textMuted }]}>
                            ¿No tienes un código? Contacta al administrador de tu negocio
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 48,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
    },
    form: {
        marginBottom: 24,
    },
    footer: {
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        textAlign: 'center',
    },
});
