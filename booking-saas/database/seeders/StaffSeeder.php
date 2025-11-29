<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tenants = \App\Models\Tenant::all();

        $staffMembers = [
            ['name' => 'Professional One', 'color' => '#3B82F6', 'bio' => '5 years of experience'],
            ['name' => 'Professional Two', 'color' => '#10B981', 'bio' => '8 years of experience'],
            ['name' => 'Professional Three', 'color' => '#F59E0B', 'bio' => '3 years of experience'],
        ];

        foreach ($tenants as $tenant) {
            foreach ($staffMembers as $index => $member) {
                \App\Models\Staff::create([
                    'tenant_id' => $tenant->id,
                    'name' => $member['name'],
                    'email' => 'staff' . ($index + 1) . '@' . $tenant->slug . '.com',
                    'phone' => '+555000' . ($index + 1) . '000',
                    'color' => $member['color'],
                    'bio' => $member['bio'],
                    'is_active' => true,
                    'display_order' => $index,
                ]);
            }
        }
    }
}
