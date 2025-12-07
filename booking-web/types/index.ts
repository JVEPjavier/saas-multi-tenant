/**
 * TypeScript Types
 * Shared types between frontend and backend
 */

// Customer/User types
export interface Customer {
    id: number;
    tenant_id: number;
    name: string;
    email: string | null;
    phone: string;
    birth_date: string | null;
    gender: 'male' | 'female' | 'other' | null;
    avatar_url: string | null;
    notes: string | null;
    total_appointments: number;
    total_spent: string;
    last_appointment_at: string | null;
    is_blocked: boolean;
    created_at: string;
    updated_at: string;
}

// Tenant types
export interface Tenant {
    id: number;
    name: string;
    slug: string;
    domain: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    logo_url: string | null;
    timezone: string;
    currency: string;
    settings: Record<string, any> | null;
    subscription_status: 'trial' | 'active' | 'suspended' | 'cancelled';
    trial_ends_at: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// Service types
export interface Service {
    id: number;
    tenant_id: number;
    name: string;
    description: string | null;
    duration: number;
    price: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// Staff types
export interface Staff {
    id: number;
    tenant_id: number;
    name: string;
    email: string | null;
    phone: string | null;
    avatar_url: string | null;
    bio: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    services?: Service[];
}

// Appointment types
export interface Appointment {
    id: number;
    tenant_id: number;
    customer_id: number;
    staff_id: number;
    service_id: number;
    appointment_date: string;
    start_time: string;
    end_time: string;
    duration: number;
    price: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    payment_status: 'pending' | 'paid' | 'refunded';
    notes: string | null;
    cancellation_reason: string | null;
    cancelled_at: string | null;
    confirmed_at: string | null;
    completed_at: string | null;
    created_at: string;
    updated_at: string;
    customer?: Customer;
    staff?: Staff;
    service?: Service;
}

// Auth types
export interface LoginRequest {
    tenant_slug: string;
    phone: string;
}

export interface RegisterRequest {
    tenant_slug: string;
    name: string;
    phone: string;
    email?: string;
}

export interface AuthResponse {
    customer: Customer;
    token: string;
}

// API Error types
export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    status?: number;
}

// API Response types
export interface ApiResponse<T> {
    data: T;
    message?: string;
}
