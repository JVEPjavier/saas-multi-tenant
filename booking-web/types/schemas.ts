/**
 * Zod Validation Schemas
 * Centralized validation schemas for forms and API requests
 */

import { z } from 'zod';

// Auth Schemas
export const loginSchema = z.object({
    tenant_slug: z.string().min(1, 'El tenant es requerido'),
    phone: z.string().min(1, 'El teléfono es requerido'),
});

export const registerSchema = z.object({
    tenant_slug: z.string().min(1, 'El tenant es requerido'),
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    phone: z.string().min(1, 'El teléfono es requerido'),
    email: z.string().email('Email inválido').optional().or(z.literal('')),
});

// Appointment Schemas
export const createAppointmentSchema = z.object({
    service_id: z.number().positive('El servicio es requerido'),
    staff_id: z.number().positive('El personal es requerido'),
    appointment_date: z.string().min(1, 'La fecha es requerida'),
    start_time: z.string().min(1, 'La hora es requerida'),
    notes: z.string().optional(),
});

// Profile Schemas
export const updateProfileSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido').optional().or(z.literal('')),
    phone: z.string().min(1, 'El teléfono es requerido'),
});

// Type inference from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CreateAppointmentFormData = z.infer<typeof createAppointmentSchema>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
