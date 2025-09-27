<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();

        if (!$user || !$user->ROLE_ADMON) {
            return redirect('/')->with('error', 'No tienes permisos para acceder a esta sección.');
        }

        return $next($request);
    }
}
