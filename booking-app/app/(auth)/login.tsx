/**
 * Login Screen
 * Pantalla de inicio de sesión
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    useColorScheme,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/auth';

export default function LoginScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const { login, tenantSlug, isLoading, error, clearError } = useAuthStore();

    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const validatePhone = (value: string): boolean => {
        if (!value.trim()) {
            setPhoneError('El teléfono es requerido');
            return false;
        }

        // Validar formato de teléfono (mínimo 8 dígitos)
        const phoneRegex = /^\+?[\d\s-]{8,}$/;
        if (!phoneRegex.test(value)) {
            setPhoneError('Ingresa un número de teléfono válido');
            return false;
        }

        setPhoneError('');
        return true;
    };

    const handleLogin = async () => {
        clearError();

        if (!validatePhone(phone)) {
            return;
        }

        if (!tenantSlug) {
            Alert.alert('Error', 'No se ha seleccionado un negocio');
            router.replace('/(auth)/select-tenant');
            return;
        }

        try {
            await login({
                tenant_slug: tenantSlug,
                phone: phone.trim(),
            });
            // La redirección se maneja automáticamente en _layout.tsx
        } catch (err: any) {
            Alert.alert('Error', err.message || 'Error al iniciar sesión');
        }
    };

    const handleGoToRegister = () => {
        router.push('/(auth)/register');
    };

    const handleChangeTenant = () => {
        router.replace('/(auth)/select-tenant');
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
                            Iniciar Sesión
                        </Text>
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                            Ingresa tu número de teléfono
                        </Text>
                        {tenantSlug && (
                            <TouchableOpacity onPress={handleChangeTenant}>
                                <Text style={[styles.tenant, { color: colors.primary }]}>
                                    Negocio: {tenantSlug}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.form}>
                        <Input
                            label="Teléfono"
                            placeholder="+54 9 11 1234-5678"
                            value={phone}
                            onChangeText={(text) => {
                                setPhone(text);
                                setPhoneError('');
                            }}
                            error={phoneError}
                            keyboardType="phone-pad"
                            autoComplete="tel"
                        />

                        <Button
                            title="Iniciar Sesión"
                            onPress={handleLogin}
                            loading={isLoading}
                            fullWidth
                        />

                        <TouchableOpacity
                            onPress={handleGoToRegister}
                            style={styles.registerButton}
                        >
                            <Text style={[styles.registerText, { color: colors.textSecondary }]}>
                                ¿No tienes cuenta?{' '}
                                <Text style={{ color: colors.primary, fontWeight: '600' }}>
                                    Regístrate
                                </Text>
                            </Text>
                        </TouchableOpacity>
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
        marginBottom: 8,
    },
    tenant: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 4,
    },
    form: {
        marginBottom: 24,
    },
    registerButton: {
        marginTop: 16,
        alignItems: 'center',
    },
    registerText: {
        fontSize: 14,
    },
});
