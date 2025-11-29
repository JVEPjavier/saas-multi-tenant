<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Staff;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    public function index(Request $request)
    {
        $staff = Staff::with('services')
                     ->active()
                     ->ordered()
                     ->get();

        return response()->json($staff);
    }

    public function show($id)
    {
        $staff = Staff::with(['services', 'schedules'])
                     ->findOrFail($id);

        return response()->json($staff);
    }

    public function availability(Request $request, $id)
    {
        $request->validate([
            'date' => 'required|date',
        ]);

        $staff = Staff::findOrFail($id);
        
        // Aquí implementarías la lógica de disponibilidad real
        // Por ahora retornamos slots de ejemplo
        
        $slots = [];
        for ($hour = 9; $hour <= 17; $hour++) {
            for ($minute = 0; $minute < 60; $minute += 30) {
                $time = sprintf('%02d:%02d', $hour, $minute);
                $slots[] = [
                    'time' => $time,
                    'available' => rand(0, 1) == 1,
                ];
            }
        }

        return response()->json($slots);
    }
}
