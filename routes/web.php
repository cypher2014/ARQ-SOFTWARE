<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\LoginAdminController; // 👈 Importamos el controlador de admins
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Rutas de Usuarios (Default Laravel Breeze / Jetstream)
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';


/*
|--------------------------------------------------------------------------
| Rutas de Administradores
|--------------------------------------------------------------------------
*/

// Invitados (no logueados como admin)
Route::middleware('guest:admin')->group(function () {
    Route::get('/loginadmons', [LoginAdminController::class, 'showLoginForm'])
        ->name('admin.login');
    Route::post('/loginadmons', [LoginAdminController::class, 'login'])
        ->name('admin.login.post');
});

// Autenticados como admin
Route::middleware('auth:admin')->group(function () {
    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/AdminDashboard'); // 👈 Vista React: resources/js/Pages/Admin/Dashboard.jsx
    })->name('admin.dashboard');

    Route::post('/logoutadmons', [LoginAdminController::class, 'logout'])
        ->name('admin.logout');
});


