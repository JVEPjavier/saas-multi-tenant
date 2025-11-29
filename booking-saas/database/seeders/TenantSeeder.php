<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TenantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tenants = [
            [
                'name' => 'Demo Barbershop',
                'slug' => 'demo-barbershop',
                'domain' => 'demo-barbershop.test',
                'email' => 'contact@demobarbershop.com',
                'phone' => '+1234567890',
                'timezone' => 'America/Argentina/Buenos_Aires',
                'currency' => 'ARS',
                'subscription_status' => 'active',
                'is_active' => true,
            ],
            [
                'name' => 'Elegant Salon',
                'slug' => 'elegant-salon',
                'domain' => 'elegant-salon.test',
                'email' => 'info@elegantsalon.com',
                'phone' => '+0987654321',
                'timezone' => 'America/Argentina/Buenos_Aires',
                'currency' => 'ARS',
                'subscription_status' => 'trial',
                'trial_ends_at' => now()->addDays(14),
                'is_active' => true,
            ],
        ];

        foreach ($tenants as $tenant) {
            \App\Models\Tenant::create($tenant);
        }
    }
}
