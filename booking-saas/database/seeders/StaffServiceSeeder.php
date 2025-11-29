<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StaffServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $staff = \App\Models\Staff::all();

        foreach ($staff as $member) {
            // Asignar servicios aleatorios a cada staff
            $services = \App\Models\Service::where('tenant_id', $member->tenant_id)
                              ->inRandomOrder()
                              ->take(rand(2, 4))
                              ->get();

            foreach ($services as $service) {
                $member->services()->attach($service->id, [
                    'tenant_id' => $member->tenant_id,
                ]);
            }
        }
    }
}
