<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'tenant_slug' => 'required|exists:tenants,slug',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'nullable|email',
        ]);

        $tenant = Tenant::where('slug', $request->tenant_slug)
                       ->where('is_active', true)
                       ->firstOrFail();

        $customer = Customer::create([
            'tenant_id' => $tenant->id,
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
        ]);

        $token = $customer->createToken('mobile-app')->plainTextToken;

        return response()->json([
            'customer' => $customer,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'tenant_slug' => 'required|exists:tenants,slug',
            'phone' => 'required|string',
        ]);

        $tenant = Tenant::where('slug', $request->tenant_slug)
                       ->where('is_active', true)
                       ->firstOrFail();

        $customer = Customer::where('tenant_id', $tenant->id)
                           ->where('phone', $request->phone)
                           ->first();

        if (!$customer) {
            throw ValidationException::withMessages([
                'phone' => ['Customer not found.'],
            ]);
        }

        $token = $customer->createToken('mobile-app')->plainTextToken;

        return response()->json([
            'customer' => $customer,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
