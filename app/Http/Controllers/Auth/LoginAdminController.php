<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginAdminController extends Controller
{
    // Mostrar formulario de login de administradores
    public function showLoginForm()
    {
        return Inertia::render('Admin/LoginAdmin');
    }

    // Login de administrador
    public function login(Request $request)
    {
        // Validación
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Intentar login con el guard 'admin'
        if (Auth::guard('admin')->attempt($credentials)) {
            $request->session()->regenerate(); // regenerar sesión

            return redirect()->intended(route('admin.dashboard'))
                ->with('success', 'Bienvenido administrador');
        }

        // Si falla, regresar con error
        return back()->withErrors([
            'email' => 'Credenciales incorrectas',
        ])->onlyInput('email');
    }

    // Logout de administrador
    public function logout(Request $request)
    {
        Auth::guard('admin')->logout(); // cerrar sesión del guard admin
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login')
            ->with('success', 'Sesión cerrada correctamente.');
    }

    // Dashboard de administrador protegido
    public function adminDashboard()
    {
        $admin = Auth::guard('admin')->user(); // obtener el usuario logueado en el guard 'admin'

        return Inertia::render('Admin/AdminDashboard', [
            'auth' => ['user' => $admin],
        ]);
    }
}









