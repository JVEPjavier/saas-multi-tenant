'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application Error:', error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="min-h-screen flex items-center justify-center bg-background p-4">
                    <div className="text-center max-w-md mx-auto">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-6">
                            <AlertCircle className="w-10 h-10 text-destructive" />
                        </div>

                        <h1 className="text-3xl font-bold mb-3">¡Algo salió mal!</h1>
                        <p className="text-muted-foreground mb-8">
                            Lo sentimos, ocurrió un error inesperado. Por favor intenta de nuevo.
                        </p>

                        {process.env.NODE_ENV === 'development' && error.message && (
                            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-left">
                                <p className="text-sm font-mono text-destructive break-all">
                                    {error.message}
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button onClick={reset} size="lg">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Intentar de nuevo
                            </Button>
                            <Link href="/">
                                <Button variant="outline" size="lg">
                                    <Home className="w-4 h-4 mr-2" />
                                    Ir al Inicio
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
