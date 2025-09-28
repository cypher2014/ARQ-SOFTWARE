<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginAdminController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('Admin/LoginAdmin');
    }

   public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    // 🔹 Importante: usa 'EMAIL' => value, pero 'password' lowercase
    if (Auth::guard('admin')->attempt([
        'EMAIL' => $credentials['email'],  
        'password' => $credentials['password'], // ⚡ Laravel llama getAuthPassword()
    ])) {
        $request->session()->regenerate();
        return redirect()->intended(route('admin.dashboard'))
            ->with('success', 'Bienvenido administrador');
    }

    return back()->withErrors([
        'email' => 'Credenciales incorrectas',
    ])->onlyInput('email');
}


    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login')
            ->with('success', 'Sesión cerrada correctamente.');
    }

    public function adminDashboard()
    {
        $admin = Auth::guard('admin')->user();

        return Inertia::render('Admin/AdminDashboard', [
            'auth' => ['user' => $admin],
        ]);
    }
}







