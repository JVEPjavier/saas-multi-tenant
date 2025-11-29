/**
 * API Types
 * Request, Response y Error types para la API
 */

import { Customer, Staff, Service, Appointment } from './models.types';

// ============================================
// AUTH API TYPES
// ============================================

export interface RegisterRequest {
    tenant_slug: string;
    name: string;
    phone: string;
    email?: string;
}

export interface RegisterResponse {
    customer: Customer;
    token: string;
}

export interface LoginRequest {
    tenant_slug: string;
    phone: string;
}

export interface LoginResponse {
    customer: Customer;
    token: string;
}

export interface MeResponse extends Customer { }

// ============================================
// STAFF API TYPES
// ============================================

export interface StaffListResponse extends Array<Staff> { }

export interface StaffDetailResponse extends Staff { }

export interface StaffAvailabilityRequest {
    date?: string; // YYYY-MM-DD
    service_id?: number;
}

export interface StaffAvailabilityResponse {
    staff: Staff;
    schedules: any[]; // TODO: definir mejor
    exceptions: any[];
    available_slots?: string[];
}

// ============================================
// SERVICES API TYPES
// ============================================

export interface ServiceListResponse extends Array<Service> { }

export interface ServiceDetailResponse extends Service { }

export interface ServicesByStaffResponse extends Array<Service> { }

// ============================================
// APPOINTMENTS API TYPES
// ============================================

export interface AppointmentListResponse extends Array<Appointment> { }

export interface AppointmentDetailResponse extends Appointment { }

export interface CreateAppointmentRequest {
    staff_id: number;
    service_id: number;
    appointment_date: string; // YYYY-MM-DD
    start_time: string; // HH:mm:ss
    notes?: string;
}

export interface CreateAppointmentResponse extends Appointment { }

export interface UpdateAppointmentRequest {
    appointment_date?: string;
    start_time?: string;
    notes?: string;
}

export interface UpdateAppointmentResponse extends Appointment { }

export interface CancelAppointmentRequest {
    reason?: string;
}

export interface CancelAppointmentResponse extends Appointment { }

export interface ConfirmAppointmentResponse extends Appointment { }

// ============================================
// CUSTOMER API TYPES
// ============================================

export interface CustomerProfileResponse extends Customer { }

export interface UpdateProfileRequest {
    name?: string;
    phone?: string;
    email?: string;
}

export interface UpdateProfileResponse extends Customer { }

export interface CustomerAppointmentsResponse extends Array<Appointment> { }

// ============================================
// ERROR TYPES
// ============================================

export interface ValidationError {
    [field: string]: string[];
}

export interface ApiError {
    message: string;
    errors?: ValidationError;
    status?: number;
}

export interface ApiErrorResponse {
    message: string;
    errors?: ValidationError;
}

// ============================================
// GENERIC API TYPES
// ============================================

export interface ApiResponse<T = any> {
    data: T;
    message?: string;
}

export interface PaginatedResponse<T = any> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

export interface ApiSuccessResponse {
    message: string;
}

// ============================================
// REQUEST CONFIG
// ============================================

export interface ApiRequestConfig {
    headers?: Record<string, string>;
    params?: Record<string, any>;
    timeout?: number;
}
