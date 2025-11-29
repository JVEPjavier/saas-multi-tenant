<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Service;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index(Request $request)
    {
        $appointments = Appointment::with(['staff', 'service'])
                                  ->where('customer_id', $request->user()->id)
                                  ->orderBy('appointment_date', 'desc')
                                  ->get();

        return response()->json($appointments);
    }

    public function store(Request $request)
    {
        $request->validate([
            'staff_id' => 'required|exists:staff,id',
            'service_id' => 'required|exists:services,id',
            'appointment_date' => 'required|date|after_or_equal:today',
            'start_time' => 'required',
            'notes' => 'nullable|string',
        ]);

        $service = Service::findOrFail($request->service_id);
        
        $startTime = $request->start_time;
        $endTime = date('H:i:s', strtotime($startTime) + ($service->duration * 60));

        // Validar disponibilidad
        $conflict = Appointment::where('staff_id', $request->staff_id)
                              ->where('appointment_date', $request->appointment_date)
                              ->whereIn('status', ['pending', 'confirmed'])
                              ->where(function ($query) use ($startTime, $endTime) {
                                  $query->whereBetween('start_time', [$startTime, $endTime])
                                        ->orWhereBetween('end_time', [$startTime, $endTime])
                                        ->orWhere(function ($q) use ($startTime, $endTime) {
                                            $q->where('start_time', '<=', $startTime)
                                              ->where('end_time', '>=', $endTime);
                                        });
                              })
                              ->exists();

        if ($conflict) {
            return response()->json(['error' => 'Time slot not available'], 422);
        }

        $appointment = Appointment::create([
            'tenant_id' => $request->user()->tenant_id,
            'customer_id' => $request->user()->id,
            'staff_id' => $request->staff_id,
            'service_id' => $request->service_id,
            'appointment_date' => $request->appointment_date,
            'start_time' => $startTime,
            'end_time' => $endTime,
            'duration' => $service->duration,
            'price' => $service->price,
            'notes' => $request->notes,
            'status' => 'pending',
        ]);

        return response()->json($appointment->load(['staff', 'service']), 201);
    }

    public function show($id)
    {
        $appointment = Appointment::with(['staff', 'service', 'customer'])
                                 ->findOrFail($id);

        return response()->json($appointment);
    }

    public function update(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);

        $request->validate([
            'appointment_date' => 'sometimes|date|after_or_equal:today',
            'start_time' => 'sometimes',
            'notes' => 'nullable|string',
        ]);

        $appointment->update($request->only(['appointment_date', 'start_time', 'notes']));

        return response()->json($appointment->load(['staff', 'service']));
    }

    public function destroy($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();

        return response()->json(['message' => 'Appointment deleted successfully']);
    }

    public function cancel(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);

        if (!$appointment->canBeCancelled()) {
            return response()->json(['error' => 'Cannot cancel this appointment'], 422);
        }

        $appointment->update([
            'status' => 'cancelled',
            'cancellation_reason' => $request->reason,
            'cancelled_at' => now(),
        ]);

        return response()->json($appointment);
    }

    public function confirm($id)
    {
        $appointment = Appointment::findOrFail($id);

        $appointment->update([
            'status' => 'confirmed',
            'confirmed_at' => now(),
        ]);

        return response()->json($appointment);
    }
}
