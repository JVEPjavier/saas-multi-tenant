/**
 * Models Types
 * Basados en los modelos Eloquent del backend Laravel
 */

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
    subscription_status: 'active' | 'trial' | 'suspended' | 'cancelled';
    trial_ends_at: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface Customer {
    id: number;
    tenant_id: number;
    name: string;
    phone: string;
    email: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    // Relaciones
    tenant?: Tenant;
}

export interface Staff {
    id: number;
    tenant_id: number;
    user_id: number | null;
    name: string;
    email: string | null;
    phone: string | null;
    avatar_url: string | null;
    bio: string | null;
    color: string | null;
    is_active: boolean;
    display_order: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    // Relaciones
    tenant?: Tenant;
    services?: Service[];
    schedules?: Schedule[];
}

export interface Service {
    id: number;
    tenant_id: number;
    name: string;
    description: string | null;
    duration: number; // en minutos
    price: string; // decimal como string
    color: string | null;
    is_active: boolean;
    display_order: number;
    image_url: string | null;
    category: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    // Relaciones
    tenant?: Tenant;
    staff?: Staff[];
}

export interface Appointment {
    id: number;
    tenant_id: number;
    customer_id: number;
    staff_id: number;
    service_id: number;
    appointment_date: string; // YYYY-MM-DD
    start_time: string; // HH:mm:ss
    end_time: string; // HH:mm:ss
    duration: number; // en minutos
    price: string; // decimal como string
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
    payment_status: 'pending' | 'paid' | 'refunded' | null;
    notes: string | null;
    cancellation_reason: string | null;
    cancelled_at: string | null;
    confirmed_at: string | null;
    completed_at: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    // Relaciones
    tenant?: Tenant;
    customer?: Customer;
    staff?: Staff;
    service?: Service;
    payment?: Payment;
}

export interface Schedule {
    id: number;
    tenant_id: number;
    staff_id: number;
    day_of_week: number; // 0-6 (Domingo-Sábado)
    start_time: string; // HH:mm:ss
    end_time: string; // HH:mm:ss
    is_available: boolean;
    created_at: string;
    updated_at: string;
    // Relaciones
    staff?: Staff;
}

export interface ScheduleException {
    id: number;
    tenant_id: number;
    staff_id: number;
    date: string; // YYYY-MM-DD
    start_time: string | null; // HH:mm:ss
    end_time: string | null; // HH:mm:ss
    is_available: boolean;
    reason: string | null;
    created_at: string;
    updated_at: string;
    // Relaciones
    staff?: Staff;
}

export interface Payment {
    id: number;
    tenant_id: number;
    appointment_id: number;
    amount: string; // decimal como string
    payment_method: 'cash' | 'card' | 'transfer' | 'online' | null;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    transaction_id: string | null;
    paid_at: string | null;
    created_at: string;
    updated_at: string;
    // Relaciones
    appointment?: Appointment;
}

// Tipos auxiliares para la UI
export interface TimeSlot {
    time: string;
    available: boolean;
    appointment?: Appointment;
}

export interface AvailabilityDay {
    date: string;
    available: boolean;
    slots: TimeSlot[];
}
