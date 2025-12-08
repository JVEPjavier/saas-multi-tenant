import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Calendar, User, Building2 } from 'lucide-react';

export default async function DashboardPage() {
    const session = await auth();

    // This should never happen due to layout auth check, but TypeScript safety
    if (!session) {
        return null;
    }

    const { customer } = session;

    return (
        <>
            {/* Welcome Section */}
            <div className="bg-linear-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 mb-8 border border-primary/20">
                <h2 className="text-3xl font-bold mb-2">
                    ¡Bienvenido de nuevo, {customer.name}! 👋
                </h2>
                <p className="text-muted-foreground">
                    Gestiona tus citas y perfil
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total de Citas</p>
                            <p className="text-2xl font-bold">{customer.total_appointments}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <User className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Gastado</p>
                            <p className="text-2xl font-bold">${customer.total_spent}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Miembro Desde</p>
                            <p className="text-2xl font-bold">
                                {new Date(customer.created_at).toLocaleDateString('es-ES', {
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Info */}
            <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Tu Información</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Nombre</p>
                        <p className="font-medium">{customer.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Teléfono</p>
                        <p className="font-medium">{customer.phone}</p>
                    </div>
                    {customer.email && (
                        <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium">{customer.email}</p>
                        </div>
                    )}
                    <div>
                        <p className="text-sm text-muted-foreground">ID de Cliente</p>
                        <p className="font-medium">#{customer.id}</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button size="lg" className="h-14">
                    <Calendar className="w-5 h-5 mr-2" />
                    Reservar Nueva Cita
                </Button>
                <Button size="lg" variant="outline" className="h-14">
                    <User className="w-5 h-5 mr-2" />
                    Ver Mis Citas
                </Button>
            </div>
        </>
    );
}
