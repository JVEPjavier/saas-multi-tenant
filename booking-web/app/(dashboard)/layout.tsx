import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, Building2, LayoutDashboard, User, Settings } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect('/login');
    }

    const navItems = [
        { href: '/home', label: 'Home', icon: LayoutDashboard },
        { href: '/profile', label: 'Perfil', icon: User },
        { href: '/settings', label: 'Configuración', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border bg-card sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h1 className="font-semibold">Booking App</h1>
                                <p className="text-xs text-muted-foreground">
                                    {session.customer.name}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <ThemeToggle />
                            <form
                                action={async () => {
                                    'use server';
                                    await signOut({ redirectTo: '/login' });
                                }}
                            >
                                <Button variant="ghost" size="sm" type="submit">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Cerrar Sesión
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex gap-1 mt-4 -mb-4">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant="ghost"
                                    className="gap-2 rounded-t-lg rounded-b-none"
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </Button>
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
