<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::active()
                          ->ordered()
                          ->get();

        return response()->json($services);
    }

    public function show($id)
    {
        $service = Service::with('staff')->findOrFail($id);

        return response()->json($service);
    }

    public function byStaff($staffId)
    {
        $services = Service::whereHas('staff', function ($query) use ($staffId) {
            $query->where('staff_id', $staffId);
        })->active()->get();

        return response()->json($services);
    }
}
