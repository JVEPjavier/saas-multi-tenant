<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tenants = \App\Models\Tenant::all();

        foreach ($tenants as $tenant) {
            // Owner
            \App\Models\User::create([
                'tenant_id' => $tenant->id,
                'name' => 'Owner ' . $tenant->name,
                'email' => 'owner@' . $tenant->slug . '.com',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'role' => 'owner',
                'is_active' => true,
                'email_verified_at' => now(),
            ]);

            // Admin
            \App\Models\User::create([
                'tenant_id' => $tenant->id,
                'name' => 'Admin ' . $tenant->name,
                'email' => 'admin@' . $tenant->slug . '.com',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'role' => 'admin',
                'is_active' => true,
                'email_verified_at' => now(),
            ]);

            // Staff
            \App\Models\User::create([
                'tenant_id' => $tenant->id,
                'name' => 'Staff Member',
                'email' => 'staff@' . $tenant->slug . '.com',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'role' => 'staff',
                'is_active' => true,
                'email_verified_at' => now(),
            ]);
        }
    }
}
