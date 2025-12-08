'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction, type LoginFormState } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, Phone, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const initialState: LoginFormState = {};

export default function LoginPage() {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(loginAction, initialState);

    useEffect(() => {
        if (state.success) {
            router.push('/home');
            router.refresh();
        }
    }, [state.success, router]);

    return (
        <>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-center">Bienvenido de nuevo</h1>
                <p className="text-muted-foreground mt-2 text-center">
                    Inicia sesión en tu cuenta de reservas
                </p>
            </div>

            {/* Login Card */}
            <div className="bg-card border border-border rounded-2xl shadow-lg p-8">
                <form action={formAction} className="space-y-6">
                    {/* Error Message */}
                    {state.errors?._form && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <p>{state.errors._form[0]}</p>
                        </div>
                    )}

                    {/* Tenant Slug Field */}
                    <div className="space-y-2">
                        <Label htmlFor="tenant">Negocio / Tenant</Label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                id="tenant"
                                name="tenant_slug"
                                type="text"
                                placeholder="elegant-salon"
                                className="pl-10"
                                required
                                disabled={isPending}
                                aria-describedby="tenant-error"
                            />
                        </div>
                        {state.errors?.tenant_slug && (
                            <p id="tenant-error" className="text-xs text-destructive">
                                {state.errors.tenant_slug[0]}
                            </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            Ingresa el identificador del negocio (ej: elegant-salon, demo-barbershop)
                        </p>
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                        <Label htmlFor="phone">Número de Teléfono</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="+1111111111"
                                className="pl-10"
                                required
                                disabled={isPending}
                                aria-describedby="phone-error"
                            />
                        </div>
                        {state.errors?.phone && (
                            <p id="phone-error" className="text-xs text-destructive">
                                {state.errors.phone[0]}
                            </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            Usa +1111111111 para cuenta demo
                        </p>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full h-11"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Iniciando sesión...
                            </>
                        ) : (
                            'Iniciar Sesión'
                        )}
                    </Button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                            ¿No tienes una cuenta?
                        </span>
                    </div>
                </div>

                {/* Register Link */}
                <Link href="/register">
                    <Button variant="outline" className="w-full" disabled={isPending}>
                        Crear Cuenta
                    </Button>
                </Link>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-muted-foreground mt-6">
                Al iniciar sesión, aceptas nuestros{' '}
                <Link href="/terms" className="underline hover:text-foreground">
                    Términos de Servicio
                </Link>{' '}
                y{' '}
                <Link href="/privacy" className="underline hover:text-foreground">
                    Política de Privacidad
                </Link>
            </p>
        </>
    );
}
