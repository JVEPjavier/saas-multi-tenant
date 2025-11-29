<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTenantAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();
        
        // Verificar que el tenant esté activo
        if (!$user->tenant || !$user->tenant->is_active) {
            auth()->logout();
            return redirect()->route('login')
                           ->with('error', 'Tenant inactivo o suspendido');
        }

        // Verificar que el usuario esté activo
        if (!$user->is_active) {
            auth()->logout();
            return redirect()->route('login')
                           ->with('error', 'Usuario inactivo');
        }

        return $next($request);
    }
}
