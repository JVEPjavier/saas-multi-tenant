'use server';

/**
 * Server Actions for Authentication
 * Best practice in Next.js 16 - server-side form handling
 */

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { loginSchema, registerSchema } from '@/types/schemas';

export type LoginFormState = {
    errors?: {
        tenant_slug?: string[];
        phone?: string[];
        _form?: string[];
    };
    success?: boolean;
};

export type RegisterFormState = {
    errors?: {
        tenant_slug?: string[];
        name?: string[];
        phone?: string[];
        email?: string[];
        _form?: string[];
    };
    success?: boolean;
};

/**
 * Login action
 */
export async function loginAction(
    prevState: LoginFormState,
    formData: FormData
): Promise<LoginFormState> {
    // Validate form data
    const validatedFields = loginSchema.safeParse({
        tenant_slug: formData.get('tenant_slug'),
        phone: formData.get('phone'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { tenant_slug, phone } = validatedFields.data;

    try {
        await signIn('credentials', {
            tenant_slug,
            phone,
            redirect: false,
        });

        return { success: true };
    } catch (error) {
        if (error instanceof AuthError) {
            return {
                errors: {
                    _form: ['Credenciales inválidas. Por favor verifica tu tenant y número de teléfono.'],
                },
            };
        }
        throw error;
    }
}

/**
 * Register action
 */
export async function registerAction(
    prevState: RegisterFormState,
    formData: FormData
): Promise<RegisterFormState> {
    // Validate form data
    const validatedFields = registerSchema.safeParse({
        tenant_slug: formData.get('tenant_slug'),
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { tenant_slug, name, phone, email } = validatedFields.data;

    try {
        // Call Laravel API to register
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                tenant_slug,
                name,
                phone,
                email: email || undefined,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            return {
                errors: {
                    _form: [error.message || 'Registro fallido'],
                },
            };
        }

        // Auto-login after registration
        await signIn('credentials', {
            tenant_slug,
            phone,
            redirect: false,
        });

        return { success: true };
    } catch (error) {
        return {
            errors: {
                _form: ['Ocurrió un error durante el registro. Por favor intenta de nuevo.'],
            },
        };
    }
}

/**
 * Logout action
 */
export async function logoutAction() {
    await signOut({ redirectTo: '/auth/login' });
}
