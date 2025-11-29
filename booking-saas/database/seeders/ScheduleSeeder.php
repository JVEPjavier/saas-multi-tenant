<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $staff = \App\Models\Staff::all();

        foreach ($staff as $member) {
            // Lunes a Viernes: 9am - 6pm
            for ($day = 1; $day <= 5; $day++) {
                \App\Models\Schedule::create([
                    'tenant_id' => $member->tenant_id,
                    'staff_id' => $member->id,
                    'day_of_week' => $day,
                    'start_time' => '09:00:00',
                    'end_time' => '18:00:00',
                    'is_active' => true,
                ]);
            }

            // Sábado: 10am - 3pm
            \App\Models\Schedule::create([
                'tenant_id' => $member->tenant_id,
                'staff_id' => $member->id,
                'day_of_week' => 6,
                'start_time' => '10:00:00',
                'end_time' => '15:00:00',
                'is_active' => true,
            ]);
        }
    }
}
