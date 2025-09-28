<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\AgendaController;
use App\Http\Controllers\Auth\LoginAdminController;
use App\Http\Controllers\Auth\RegisterAdminController;

/*
|--------------------------------------------------------------------------
| Rutas públicas
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

/*
|--------------------------------------------------------------------------
| Rutas de Dashboard Usuarios
|--------------------------------------------------------------------------
*/
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/*
|--------------------------------------------------------------------------
| Rutas protegidas para Usuarios
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/appointment/create', [AgendaController::class, 'create'])->name('appointment.create');
    Route::post('/appointment', [AgendaController::class, 'store'])->name('appointment.store');
    Route::get('/appointment', [AgendaController::class, 'index'])->name('appointment.index');
    Route::get('/appointment/{appointment}', [AgendaController::class, 'show'])->name('appointment.show');
    Route::get('/appointment/{appointment}/edit', [AgendaController::class, 'edit'])->name('appointment.edit');
    Route::put('/appointment/{appointment}', [AgendaController::class, 'update'])->name('appointment.update');
});

require __DIR__.'/auth.php';

/*
|-------------------------------------------------------------------------- 
| Rutas de Administradores
|-------------------------------------------------------------------------- 
*/
Route::prefix('admin')->name('admin.')->group(function () {
    // Registro
    Route::get('register', [RegisterAdminController::class, 'create'])->name('register');
    Route::post('register', [RegisterAdminController::class, 'store'])->name('register.store');

    // Login
    Route::get('login', [LoginAdminController::class, 'showLoginForm'])->name('login');
    Route::post('login', [LoginAdminController::class, 'login'])->name('login.submit');
    Route::post('logout', [LoginAdminController::class, 'logout'])->name('logout');

    // Dashboard admin protegido
    Route::middleware(['auth:admin', 'isAdmin'])->group(function () {
        Route::get('dashboard', [LoginAdminController::class, 'adminDashboard'])->name('dashboard');
    });
});







