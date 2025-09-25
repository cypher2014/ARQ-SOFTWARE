<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginAdminController extends Controller
{
    /**
     * Mostrar el formulario de login (React/Inertia).
     */
    public function showLoginForm()
    {
        return Inertia::render('Admin/LoginAdmin'); 
    }

    /**
     * Procesar el login del administrador.
     */
    public function login(Request $request)
    {
        // Validar datos
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Intentar login con el guard "admin"
        if (Auth::guard('admin')->attempt([
            'EMAIL'    => $credentials['email'],   // 👈 coincide con el campo de tu DB
            'password' => $credentials['password'],
        ])) {
            // Regenerar la sesión
            $request->session()->regenerate();

            return redirect()->intended(route('admin.dashboard'))
                ->with('success', 'Bienvenido administrador');
        }

        return back()->withErrors([
            'email' => 'Las credenciales no son correctas.',
        ])->onlyInput('email');
    }

    /**
     * Cerrar sesión.
     */
    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login')
            ->with('success', 'Sesión cerrada correctamente.');
    }

    /**
     * Dashboard del administrador (React/Inertia).
     */
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard'); 
        // ✅ Crea resources/js/Pages/Admin/Dashboard.jsx
    }
}

