<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tenants = \App\Models\Tenant::all();

        $services = [
            ['name' => 'Basic Service', 'duration' => 30, 'price' => 2500.00, 'category' => 'Basic'],
            ['name' => 'Standard Service', 'duration' => 45, 'price' => 4000.00, 'category' => 'Standard'],
            ['name' => 'Premium Service', 'duration' => 60, 'price' => 6000.00, 'category' => 'Premium'],
            ['name' => 'Deluxe Service', 'duration' => 90, 'price' => 9000.00, 'category' => 'Premium'],
            ['name' => 'Express Service', 'duration' => 15, 'price' => 1500.00, 'category' => 'Basic'],
        ];

        foreach ($tenants as $tenant) {
            foreach ($services as $index => $service) {
                \App\Models\Service::create([
                    'tenant_id' => $tenant->id,
                    'name' => $service['name'],
                    'description' => 'Description for ' . $service['name'],
                    'duration' => $service['duration'],
                    'price' => $service['price'],
                    'category' => $service['category'],
                    'is_active' => true,
                    'display_order' => $index,
                ]);
            }
        }
    }
}
