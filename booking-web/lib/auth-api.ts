/**
 * Auth API Services
 * Functions to interact with Laravel auth endpoints
 */

import apiClient from './api-client';
import { LoginRequest, RegisterRequest, AuthResponse, Customer } from '@/types';

/**
 * Login with phone number
 */
export async function login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
}

/**
 * Register new customer
 */
export async function register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
}

/**
 * Get current user
 */
export async function getMe(token: string): Promise<Customer> {
    const response = await apiClient.get<Customer>('/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

/**
 * Logout
 */
export async function logout(token: string): Promise<void> {
    await apiClient.post(
        '/auth/logout',
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
}
