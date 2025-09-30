<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\AgendaController;
use App\Http\Controllers\Auth\LoginAdminController;
use App\Http\Controllers\Auth\RegisterAdminController;
use App\Http\Middleware\AdmonAuth;

use App\Http\Controllers\Materials;
use App\Http\Controllers\MaterialsQuantityController;

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
| Rutas de Dashboard de Usuarios (Clientes)
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
| Rutas para Administradores
|--------------------------------------------------------------------------
*/
Route::prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('login', [LoginAdminController::class, 'showLoginForm'])->name('login');
        Route::post('login', [LoginAdminController::class, 'login'])->name('login.submit');
        Route::post('logout', [LoginAdminController::class, 'logout'])->name('logout');
        // Listado de administradores
        Route::get('/gestores', [RegisterAdminController::class, 'index'])
    ->name('gestores.index');

Route::get('/gestores/create', [RegisterAdminController::class, 'create'])
    ->name('gestores.create');

Route::post('/gestores', [RegisterAdminController::class, 'store'])
    ->name('gestores.store');

Route::get('/gestores/{id}/edit', [RegisterAdminController::class, 'edit'])
    ->name('gestores.edit');

Route::put('/gestores/{id}', [RegisterAdminController::class, 'update'])
    ->name('gestores.update');

Route::delete('/gestores/{id}', [RegisterAdminController::class, 'destroy'])
    ->name('gestores.destroy');

        // Dashboard protegido
        Route::middleware([AdmonAuth::class])->group(function () {
            Route::get('dashboard', [LoginAdminController::class, 'adminDashboard'])->name('dashboard');
        });
    });



    Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'admonAuth'])
    ->group(function () {
        // CRUD de materiales
        Route::get('materials', [Materials::class, 'index'])->name('materials.index');
        Route::post('materials', [Materials::class, 'store'])->name('materials.store');
        Route::delete('materials/{id}', [Materials::class, 'destroy'])->name('materials.destroy');

        // Cantidad de materiales
        Route::get('materials/quantity', [MaterialsQuantityController::class, 'index'])->name('materials.quantity');
    });









