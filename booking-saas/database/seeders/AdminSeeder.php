<?php

namespace Database\Seeders;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear un tenant principal
        $tenant = Tenant::create([
            'name' => 'Admin Tenant',
            'slug' => 'admin',
            'email' => 'admin@admin.com',
            'phone' => null,
            'address' => null,
            'timezone' => 'America/Argentina/Buenos_Aires',
            'currency' => 'ARS',
            'subscription_status' => 'active',
            'is_active' => true,
        ]);

        // Crear el usuario administrador
        User::create([
            'tenant_id' => $tenant->id,
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
            'role' => 'owner',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        $this->command->info('✅ Admin user created successfully!');
        $this->command->info('📧 Email: admin@admin.com');
        $this->command->info('🔑 Password: password');
    }
}
