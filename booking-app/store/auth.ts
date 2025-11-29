/**
 * Auth Store
 * Zustand store para manejo de autenticación
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Customer } from '@/types';
import { STORAGE_KEYS, setAuthToken, removeAuthToken } from '@/services/api/client';
import * as authApi from '@/services/api/auth';
import { LoginRequest, RegisterRequest } from '@/types';

interface AuthState {
    // State
    user: Customer | null;
    token: string | null;
    tenantSlug: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (credentials: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
    setTenant: (slug: string) => Promise<void>;
    loadPersistedAuth: () => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    // Initial State
    user: null,
    token: null,
    tenantSlug: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    // Login Action
    login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null });

        try {
            const response = await authApi.login(credentials);

            // Guardar token
            await setAuthToken(response.token);

            // Guardar usuario
            await AsyncStorage.setItem(
                STORAGE_KEYS.USER,
                JSON.stringify(response.customer)
            );

            // Guardar tenant slug
            await AsyncStorage.setItem(
                STORAGE_KEYS.TENANT_SLUG,
                credentials.tenant_slug
            );

            set({
                user: response.customer,
                token: response.token,
                tenantSlug: credentials.tenant_slug,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || 'Error al iniciar sesión',
            });
            throw error;
        }
    },

    // Register Action
    register: async (data: RegisterRequest) => {
        set({ isLoading: true, error: null });

        try {
            const response = await authApi.register(data);

            // Guardar token
            await setAuthToken(response.token);

            // Guardar usuario
            await AsyncStorage.setItem(
                STORAGE_KEYS.USER,
                JSON.stringify(response.customer)
            );

            // Guardar tenant slug
            await AsyncStorage.setItem(
                STORAGE_KEYS.TENANT_SLUG,
                data.tenant_slug
            );

            set({
                user: response.customer,
                token: response.token,
                tenantSlug: data.tenant_slug,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || 'Error al registrarse',
            });
            throw error;
        }
    },

    // Logout Action
    logout: async () => {
        set({ isLoading: true });

        try {
            // Limpiar AsyncStorage
            await AsyncStorage.multiRemove([
                STORAGE_KEYS.TOKEN,
                STORAGE_KEYS.USER,
                STORAGE_KEYS.TENANT_SLUG,
            ]);

            // Limpiar token del cliente API
            await removeAuthToken();

            set({
                user: null,
                token: null,
                tenantSlug: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            });
        } catch (error: any) {
            console.error('Error al cerrar sesión:', error);
            set({ isLoading: false });
        }
    },

    // Set Tenant Action
    setTenant: async (slug: string) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.TENANT_SLUG, slug);
            set({ tenantSlug: slug });
        } catch (error) {
            console.error('Error guardando tenant slug:', error);
        }
    },

    // Load Persisted Auth
    loadPersistedAuth: async () => {
        set({ isLoading: true });

        try {
            const [token, userJson, tenantSlug] = await AsyncStorage.multiGet([
                STORAGE_KEYS.TOKEN,
                STORAGE_KEYS.USER,
                STORAGE_KEYS.TENANT_SLUG,
            ]);

            const tokenValue = token[1];
            const userValue = userJson[1];
            const tenantValue = tenantSlug[1];

            if (tokenValue && userValue) {
                const user = JSON.parse(userValue) as Customer;

                set({
                    user,
                    token: tokenValue,
                    tenantSlug: tenantValue,
                    isAuthenticated: true,
                    isLoading: false,
                });
            } else {
                set({ isLoading: false });
            }
        } catch (error) {
            console.error('Error cargando auth persistida:', error);
            set({ isLoading: false });
        }
    },

    // Clear Error
    clearError: () => set({ error: null }),
}));

export default useAuthStore;
