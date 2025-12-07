import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { signOut } from '@/auth';
import { Calendar, User, LogOut, Building2 } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default async function DashboardPage() {
    const session = await auth();

    if (!session) {
        redirect('/auth/login');
    }

    const { customer } = session;

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="font-semibold">Booking App</h1>
                            <p className="text-xs text-muted-foreground">Dashboard</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <form
                            action={async () => {
                                'use server';
                                await signOut({ redirectTo: '/auth/login' });
                            }}
                        >
                            <Button variant="ghost" size="sm" type="submit">
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </Button>
                        </form>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 mb-8 border border-primary/20">
                    <h2 className="text-3xl font-bold mb-2">
                        Welcome back, {customer.name}! 👋
                    </h2>
                    <p className="text-muted-foreground">
                        Manage your appointments and profile
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
                                <p className="text-sm text-muted-foreground">Total Appointments</p>
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
                                <p className="text-sm text-muted-foreground">Total Spent</p>
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
                                <p className="text-sm text-muted-foreground">Member Since</p>
                                <p className="text-2xl font-bold">
                                    {new Date(customer.created_at).toLocaleDateString('en-US', {
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
                    <h3 className="text-lg font-semibold mb-4">Your Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Name</p>
                            <p className="font-medium">{customer.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p className="font-medium">{customer.phone}</p>
                        </div>
                        {customer.email && (
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-medium">{customer.email}</p>
                            </div>
                        )}
                        <div>
                            <p className="text-sm text-muted-foreground">Customer ID</p>
                            <p className="font-medium">#{customer.id}</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button size="lg" className="h-14">
                        <Calendar className="w-5 h-5 mr-2" />
                        Book New Appointment
                    </Button>
                    <Button size="lg" variant="outline" className="h-14">
                        <User className="w-5 h-5 mr-2" />
                        View My Appointments
                    </Button>
                </div>
            </main>
        </div>
    );
}
