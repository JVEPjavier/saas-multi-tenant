import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bell, Moon, Globe, Shield, Trash2 } from 'lucide-react';

export default async function SettingsPage() {
    const session = await auth();

    if (!session) {
        return null;
    }

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Configuración</h1>
                <p className="text-muted-foreground">
                    Personaliza tu experiencia
                </p>
            </div>

            <div className="max-w-2xl space-y-6">
                {/* Notifications */}
                <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Bell className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Notificaciones</h3>
                            <p className="text-sm text-muted-foreground">
                                Gestiona tus preferencias de notificación
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="email-notifications">Notificaciones por Email</Label>
                                <p className="text-sm text-muted-foreground">
                                    Recibe actualizaciones por correo
                                </p>
                            </div>
                            <Switch id="email-notifications" disabled />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="sms-notifications">Notificaciones por SMS</Label>
                                <p className="text-sm text-muted-foreground">
                                    Recordatorios de citas por mensaje
                                </p>
                            </div>
                            <Switch id="sms-notifications" disabled />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="marketing">Comunicaciones de Marketing</Label>
                                <p className="text-sm text-muted-foreground">
                                    Ofertas y promociones especiales
                                </p>
                            </div>
                            <Switch id="marketing" disabled />
                        </div>
                    </div>
                </div>

                {/* Appearance */}
                <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <Moon className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Apariencia</h3>
                            <p className="text-sm text-muted-foreground">
                                Personaliza la interfaz
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="dark-mode">Modo Oscuro</Label>
                                <p className="text-sm text-muted-foreground">
                                    Usa el toggle en el header
                                </p>
                            </div>
                            <Switch id="dark-mode" disabled />
                        </div>
                    </div>
                </div>

                {/* Language */}
                <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <Globe className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Idioma</h3>
                            <p className="text-sm text-muted-foreground">
                                Selecciona tu idioma preferido
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Label>Idioma de la Aplicación</Label>
                            <p className="text-sm text-muted-foreground mt-1">
                                Español (Predeterminado)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Privacy & Security */}
                <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Privacidad y Seguridad</h3>
                            <p className="text-sm text-muted-foreground">
                                Gestiona tu privacidad
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start" disabled>
                            <Shield className="w-4 h-4 mr-2" />
                            Cambiar Contraseña
                        </Button>
                        <Button variant="outline" className="w-full justify-start" disabled>
                            <Shield className="w-4 h-4 mr-2" />
                            Autenticación de Dos Factores
                        </Button>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-card border border-destructive/50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                            <Trash2 className="w-5 h-5 text-destructive" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-destructive">Zona de Peligro</h3>
                            <p className="text-sm text-muted-foreground">
                                Acciones irreversibles
                            </p>
                        </div>
                    </div>

                    <Button variant="destructive" className="w-full" disabled>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar Cuenta
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                        Esta acción no se puede deshacer
                    </p>
                </div>

                <p className="text-sm text-center text-muted-foreground">
                    Las funcionalidades de configuración estarán disponibles próximamente
                </p>
            </div>
        </>
    );
}
