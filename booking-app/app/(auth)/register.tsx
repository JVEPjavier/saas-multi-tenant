/**
 * Register Screen
 * Pantalla de registro
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    ScrollView,
    useColorScheme,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/auth';

export default function RegisterScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const { register, tenantSlug, isLoading, clearError } = useAuthStore();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        email: '',
    });

    const validateForm = (): boolean => {
        const newErrors = {
            name: '',
            phone: '',
            email: '',
        };

        let isValid = true;

        // Validar nombre
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
            isValid = false;
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'El nombre debe tener al menos 2 caracteres';
            isValid = false;
        }

        // Validar teléfono
        if (!formData.phone.trim()) {
            newErrors.phone = 'El teléfono es requerido';
            isValid = false;
        } else {
            const phoneRegex = /^\+?[\d\s-]{8,}$/;
            if (!phoneRegex.test(formData.phone)) {
                newErrors.phone = 'Ingresa un número de teléfono válido';
                isValid = false;
            }
        }

        // Validar email (opcional pero si se ingresa debe ser válido)
        if (formData.email.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Ingresa un email válido';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleRegister = async () => {
        clearError();

        if (!validateForm()) {
            return;
        }

        if (!tenantSlug) {
            Alert.alert('Error', 'No se ha seleccionado un negocio');
            router.replace('/(auth)/select-tenant');
            return;
        }

        try {
            await register({
                tenant_slug: tenantSlug,
                name: formData.name.trim(),
                phone: formData.phone.trim(),
                email: formData.email.trim() || undefined,
            });
            // La redirección se maneja automáticamente en _layout.tsx
        } catch (err: any) {
            Alert.alert('Error', err.message || 'Error al registrarse');
        }
    };

    const handleGoToLogin = () => {
        router.back();
    };

    const handleChangeTenant = () => {
        router.replace('/(auth)/select-tenant');
    };

    const updateField = (field: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [field]: value });
        setErrors({ ...errors, [field]: '' });
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <Text style={[styles.title, { color: colors.text }]}>
                                Crear Cuenta
                            </Text>
                            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                                Completa tus datos para registrarte
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
                                label="Nombre Completo"
                                placeholder="Juan Pérez"
                                value={formData.name}
                                onChangeText={(text) => updateField('name', text)}
                                error={errors.name}
                                autoComplete="name"
                            />

                            <Input
                                label="Teléfono"
                                placeholder="+54 9 11 1234-5678"
                                value={formData.phone}
                                onChangeText={(text) => updateField('phone', text)}
                                error={errors.phone}
                                keyboardType="phone-pad"
                                autoComplete="tel"
                            />

                            <Input
                                label="Email (Opcional)"
                                placeholder="juan@ejemplo.com"
                                value={formData.email}
                                onChangeText={(text) => updateField('email', text)}
                                error={errors.email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                            />

                            <Button
                                title="Registrarse"
                                onPress={handleRegister}
                                loading={isLoading}
                                fullWidth
                            />

                            <TouchableOpacity
                                onPress={handleGoToLogin}
                                style={styles.loginButton}
                            >
                                <Text style={[styles.loginText, { color: colors.textSecondary }]}>
                                    ¿Ya tienes cuenta?{' '}
                                    <Text style={{ color: colors.primary, fontWeight: '600' }}>
                                        Inicia Sesión
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 48,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 32,
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
    loginButton: {
        marginTop: 16,
        alignItems: 'center',
    },
    loginText: {
        fontSize: 14,
    },
});
