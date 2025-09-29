<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdmonAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        // Usar guard 'admin' para validar admin logueado
        if (!Auth::guard('admin')->check()) {
            return redirect()->route('admin.login'); // Redirige al login
        }

        return $next($request);
    }
}


