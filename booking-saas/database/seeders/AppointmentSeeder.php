<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $staff = \App\Models\Staff::with('services')->get();

        foreach ($staff as $member) {
            if ($member->services->isEmpty()) continue;

            for ($i = 0; $i < 5; $i++) {
                $service = $member->services->random();
                $customer = \App\Models\Customer::where('tenant_id', $member->tenant_id)
                                   ->inRandomOrder()
                                   ->first();

                if (!$customer) continue;

                $date = now()->addDays(rand(1, 14));
                $startTime = sprintf('%02d:00:00', rand(9, 16));

                \App\Models\Appointment::create([
                    'tenant_id' => $member->tenant_id,
                    'customer_id' => $customer->id,
                    'staff_id' => $member->id,
                    'service_id' => $service->id,
                    'appointment_date' => $date->toDateString(),
                    'start_time' => $startTime,
                    'end_time' => date('H:i:s', strtotime($startTime) + ($service->duration * 60)),
                    'duration' => $service->duration,
                    'price' => $service->price,
                    'status' => ['pending', 'confirmed'][array_rand(['pending', 'confirmed'])],
                ]);
            }
        }
    }
}
