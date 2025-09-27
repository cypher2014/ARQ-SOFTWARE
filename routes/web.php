<?php

use App\Http\Controllers\User\AgendaController;
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
    // Perfil de usuario
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /*
    |--------------------------------------------------------------------------
    | Rutas de Agenda (Usuario autenticado)
    |--------------------------------------------------------------------------
    */
    Route::get('/appointment', [AgendaController::class, 'create'])->name('appointment.create');
    Route::post('/appointment', [AgendaController::class, 'store'])->name('appointment.store');
    Route::get('/appointments', [AgendaController::class, 'index'])->name('appointment.index');
});

require __DIR__.'/auth.php';

/*
|--------------------------------------------------------------------------
| Rutas de Administradores
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('login', [LoginAdminController::class, 'showLoginForm'])->name('login');
    Route::post('login', [LoginAdminController::class, 'login'])->name('login.submit');
    Route::post('logout', [LoginAdminController::class, 'logout'])->name('logout');

    Route::middleware('auth:admin')->group(function () {
        Route::get('dashboard', [LoginAdminController::class, 'dashboard'])->name('dashboard');
    });
});



