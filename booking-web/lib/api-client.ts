/**
 * API Client
 * Axios client configured for Laravel backend
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiError } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * Create API client instance
 */
export const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

/**
 * Request interceptor - Add auth token
 */
apiClient.interceptors.request.use(
    (config) => {
        // In Next.js, we'll handle auth tokens via Auth.js sessions
        // This is just for direct API calls
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('booking_token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        if (process.env.NODE_ENV === 'development') {
            console.log('📤 API Request:', {
                method: config.method?.toUpperCase(),
                url: config.url,
                data: config.data,
            });
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor - Handle errors
 */
apiClient.interceptors.response.use(
    (response) => {
        if (process.env.NODE_ENV === 'development') {
            console.log('📥 API Response:', {
                status: response.status,
                url: response.config.url,
                data: response.data,
            });
        }
        return response;
    },
    (error: AxiosError) => {
        const apiError: ApiError = {
            message: 'An error occurred',
            status: error.response?.status,
        };

        if (error.response) {
            const data = error.response.data as any;
            apiError.message = data.message || 'Server error';
            apiError.errors = data.errors;
            apiError.status = error.response.status;

            // Handle specific error codes
            switch (error.response.status) {
                case 401:
                    apiError.message = 'Session expired. Please login again.';
                    // Clear token if exists
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('booking_token');
                    }
                    break;
                case 403:
                    apiError.message = 'You do not have permission to perform this action.';
                    break;
                case 404:
                    apiError.message = 'Resource not found.';
                    break;
                case 422:
                    apiError.message = data.message || 'Invalid data.';
                    break;
                case 429:
                    apiError.message = 'Too many requests. Please try again later.';
                    break;
                case 500:
                    apiError.message = 'Internal server error. Please try again later.';
                    break;
            }
        } else if (error.request) {
            apiError.message = 'Could not connect to server. Check your internet connection.';
            apiError.status = 0;
        } else {
            apiError.message = error.message || 'Error processing request.';
        }

        if (process.env.NODE_ENV === 'development') {
            console.error('❌ API Error:', apiError);
        }

        return Promise.reject(apiError);
    }
);

export default apiClient;
