<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tenants = \App\Models\Tenant::all();

        $customers = [
            ['name' => 'John Doe', 'phone' => '+1111111111', 'email' => 'john@example.com'],
            ['name' => 'Jane Smith', 'phone' => '+2222222222', 'email' => 'jane@example.com'],
            ['name' => 'Bob Johnson', 'phone' => '+3333333333', 'email' => 'bob@example.com'],
            ['name' => 'Alice Brown', 'phone' => '+4444444444', 'email' => 'alice@example.com'],
            ['name' => 'Charlie Wilson', 'phone' => '+5555555555', 'email' => 'charlie@example.com'],
        ];

        foreach ($tenants as $tenant) {
            foreach ($customers as $customer) {
                \App\Models\Customer::create([
                    'tenant_id' => $tenant->id,
                    'name' => $customer['name'],
                    'phone' => $customer['phone'],
                    'email' => $customer['email'],
                    'gender' => ['male', 'female', 'other'][array_rand(['male', 'female', 'other'])],
                ]);
            }
        }
    }
}
