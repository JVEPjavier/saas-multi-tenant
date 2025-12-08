import { Button } from '@/components/ui/button';
import { FileQuestion, Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="text-center max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                    <FileQuestion className="w-10 h-10 text-muted-foreground" />
                </div>

                <h1 className="text-6xl font-bold mb-3">404</h1>
                <h2 className="text-2xl font-semibold mb-3">Página no encontrada</h2>
                <p className="text-muted-foreground mb-8">
                    Lo sentimos, la página que buscas no existe o ha sido movida.
                </p>

                <Link href="/">
                    <Button size="lg">
                        <Home className="w-4 h-4 mr-2" />
                        Volver al Inicio
                    </Button>
                </Link>
            </div>
        </div>
    );
}
