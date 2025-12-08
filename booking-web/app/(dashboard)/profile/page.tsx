import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Phone, Mail, Calendar, Save } from 'lucide-react';

export default async function ProfilePage() {
    const session = await auth();

    if (!session) {
        return null;
    }

    const { customer } = session;

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
                <p className="text-muted-foreground">
                    Administra tu información personal
                </p>
            </div>

            <div className="max-w-2xl">
                {/* Profile Card */}
                <div className="bg-card border border-border rounded-2xl p-8 mb-6">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{customer.name}</h2>
                            <p className="text-muted-foreground">Cliente #{customer.id}</p>
                        </div>
                    </div>

                    <form className="space-y-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre Completo</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    defaultValue={customer.name}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    defaultValue={customer.phone}
                                    className="pl-10"
                                    disabled
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                El número de teléfono no se puede cambiar
                            </p>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email (Opcional)</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    defaultValue={customer.email || ''}
                                    placeholder="tu@email.com"
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Member Since */}
                        <div className="space-y-2">
                            <Label>Miembro Desde</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    value={new Date(customer.created_at).toLocaleDateString('es-ES', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                    className="pl-10"
                                    disabled
                                />
                            </div>
                        </div>

                        {/* Save Button */}
                        <Button type="submit" size="lg" className="w-full" disabled>
                            <Save className="w-4 h-4 mr-2" />
                            Guardar Cambios
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                            Funcionalidad de edición próximamente
                        </p>
                    </form>
                </div>

                {/* Stats Card */}
                <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Estadísticas</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Total de Citas</p>
                            <p className="text-2xl font-bold">{customer.total_appointments}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Gastado</p>
                            <p className="text-2xl font-bold">${customer.total_spent}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
