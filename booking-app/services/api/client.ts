/**
 * API Client
 * Configuración de Axios con interceptores para autenticación y manejo de errores
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiError } from '@/types';

// Configuración base
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api';
const TIMEOUT = 30000; // 30 segundos

// Log de configuración en desarrollo
if (__DEV__) {
    console.log('🔧 API Configuration:', {
        API_URL,
        ENV_VAR: process.env.EXPO_PUBLIC_API_URL,
        FALLBACK: 'http://localhost:8000/api'
    });
}

// Storage keys
export const STORAGE_KEYS = {
    TOKEN: '@booking_app:token',
    TENANT_SLUG: '@booking_app:tenant_slug',
    USER: '@booking_app:user',
} as const;

/**
 * Crear instancia de Axios
 */
const createApiClient = (): AxiosInstance => {
    const client = axios.create({
        baseURL: API_URL,
        timeout: TIMEOUT,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    // Request Interceptor - Agregar token de autenticación
    client.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            try {
                const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);

                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                // Log en desarrollo
                if (__DEV__) {
                    console.log('📤 API Request:', {
                        method: config.method?.toUpperCase(),
                        baseURL: config.baseURL,
                        url: config.url,
                        fullURL: `${config.baseURL}${config.url}`,
                        data: config.data,
                        headers: config.headers,
                    });
                }

                return config;
            } catch (error) {
                console.error('Error en request interceptor:', error);
                return config;
            }
        },
        (error) => {
            console.error('Request interceptor error:', error);
            return Promise.reject(error);
        }
    );

    // Response Interceptor - Manejo de respuestas y errores
    client.interceptors.response.use(
        (response) => {
            // Log en desarrollo
            if (__DEV__) {
                console.log('📥 API Response:', {
                    status: response.status,
                    url: response.config.url,
                    data: response.data,
                });
            }

            return response;
        },
        async (error: AxiosError) => {
            // Log de error
            if (__DEV__) {
                console.error('❌ API Error:', {
                    status: error.response?.status,
                    baseURL: error.config?.baseURL,
                    url: error.config?.url,
                    fullURL: error.config ? `${error.config.baseURL}${error.config.url}` : 'N/A',
                    data: error.response?.data,
                    message: error.message,
                    code: error.code,
                    hasResponse: !!error.response,
                    hasRequest: !!error.request,
                });
            }

            // Construir objeto de error personalizado
            const apiError: ApiError = {
                message: 'Ha ocurrido un error',
                status: error.response?.status,
            };

            if (error.response) {
                // Error de respuesta del servidor
                const data = error.response.data as any;

                apiError.message = data.message || 'Error del servidor';
                apiError.errors = data.errors;
                apiError.status = error.response.status;

                // Manejar errores específicos
                switch (error.response.status) {
                    case 401:
                        // No autenticado - limpiar token y redirigir al login
                        await AsyncStorage.multiRemove([
                            STORAGE_KEYS.TOKEN,
                            STORAGE_KEYS.USER,
                        ]);
                        apiError.message = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
                        break;

                    case 403:
                        apiError.message = 'No tienes permisos para realizar esta acción.';
                        break;

                    case 404:
                        apiError.message = 'Recurso no encontrado.';
                        break;

                    case 422:
                        apiError.message = data.message || 'Datos inválidos.';
                        break;

                    case 429:
                        apiError.message = 'Demasiadas solicitudes. Por favor, intenta más tarde.';
                        break;

                    case 500:
                        apiError.message = 'Error interno del servidor. Por favor, intenta más tarde.';
                        break;

                    default:
                        apiError.message = data.message || 'Ha ocurrido un error inesperado.';
                }
            } else if (error.request) {
                // Error de red - no se recibió respuesta
                apiError.message = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
                apiError.status = 0;
            } else {
                // Error al configurar la request
                apiError.message = error.message || 'Error al procesar la solicitud.';
            }

            return Promise.reject(apiError);
        }
    );

    return client;
};

// Instancia singleton del cliente
export const apiClient = createApiClient();

/**
 * Helper para guardar el token de autenticación
 */
export const setAuthToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } catch (error) {
        console.error('Error guardando token:', error);
        throw error;
    }
};

/**
 * Helper para obtener el token de autenticación
 */
export const getAuthToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
        console.error('Error obteniendo token:', error);
        return null;
    }
};

/**
 * Helper para eliminar el token de autenticación
 */
export const removeAuthToken = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
        console.error('Error eliminando token:', error);
        throw error;
    }
};

/**
 * Helper para verificar si el usuario está autenticado
 */
export const isAuthenticated = async (): Promise<boolean> => {
    const token = await getAuthToken();
    return !!token;
};

export default apiClient;
