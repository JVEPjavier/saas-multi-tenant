/**
 * Auth API Service
 * Servicios de autenticación
 */

import { apiClient } from './client';
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    MeResponse,
} from '@/types';

/**
 * Login
 */
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
};

/**
 * Register
 */
export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>('/auth/register', data);
    return response.data;
};

/**
 * Get Current User
 */
export const getCurrentUser = async (): Promise<MeResponse> => {
    const response = await apiClient.get<MeResponse>('/auth/me');
    return response.data;
};

/**
 * Logout (si hay endpoint en el backend)
 */
export const logout = async (): Promise<void> => {
    await apiClient.post('/auth/logout');
};
