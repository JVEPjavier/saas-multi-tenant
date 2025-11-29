<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email',
            'birth_date' => 'sometimes|date',
            'gender' => 'sometimes|in:male,female,other,prefer_not_to_say',
        ]);

        $customer = $request->user();
        $customer->update($request->only(['name', 'email', 'birth_date', 'gender']));

        return response()->json($customer);
    }

    public function appointments(Request $request)
    {
        $appointments = Appointment::with(['staff', 'service'])
                                  ->where('customer_id', $request->user()->id)
                                  ->orderBy('appointment_date', 'desc')
                                  ->orderBy('start_time', 'desc')
                                  ->get();

        return response()->json($appointments);
    }
}
