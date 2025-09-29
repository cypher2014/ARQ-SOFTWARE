<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admons;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegisterAdminController extends Controller
{
    /**
     * Lista de administradores (protegido).
     */
    public function index()
    {
        $admons = Admons::orderBy('id_users', 'desc')->get();

        return Inertia::render('Admin/Index', [
            'admons' => $admons,
        ]);
    }

    /**
     * Formulario de registro público.
     */
    public function create()
    {
        return Inertia::render('Admin/Register');
    }

    /**
     * Guarda un nuevo administrador en la base de datos.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            // ⚠️ si `id_users` es autoincremental, ELIMINA esta línea
            'id_users'      => 'required|numeric|unique:admons_users,id_users',
            'name_user'     => 'required|string|max:100',
            'last_name'     => 'required|string|max:100',
            'email'         => 'required|email|unique:admons_users,email',
            'password'      => 'required|min:6',
            'user_phone'    => 'nullable|string|max:20',
            'user_position' => 'nullable|string|max:100',
            'city'          => 'nullable|string|max:100',
        ]);

        // Roles por defecto
        $validated['role_admon']   = 0;
        $validated['role_courier'] = 0;
        $validated['role_gestor']  = 1;

        Admons::create($validated);

        return redirect()->route('admin.login')->with('success', 'Administrador registrado exitosamente.');
    }

    /**
     * Formulario de edición (protegido).
     */
    public function edit($id)
    {
        $admon = Admons::findOrFail($id);

        return Inertia::render('Admin/Edit', [
            'admon' => $admon,
        ]);
    }

    /**
     * Actualiza un administrador (protegido).
     */
    public function update(Request $request, $id)
    {
        $admon = Admons::findOrFail($id);

        $validated = $request->validate([
            'name_user'     => 'required|string|max:100',
            'last_name'     => 'required|string|max:100',
            'email'         => 'required|email|unique:admons_users,email,' . $id . ',id_users',
            'password'      => 'nullable|min:6',
            'user_phone'    => 'nullable|string|max:20',
            'user_position' => 'nullable|string|max:100',
            'city'          => 'nullable|string|max:100',
        ]);

        // Roles por defecto
        $validated['role_admon']   = 0;
        $validated['role_courier'] = 0;
        $validated['role_gestor']  = 1;

        if (empty($validated['password'])) {
            unset($validated['password']);
        }

        $admon->update($validated);

        return redirect()->route('admin.gestores.index')->with('success', 'Administrador actualizado correctamente.');
    }

    /**
     * Elimina un administrador (protegido).
     */
    public function destroy($id)
    {
        $admon = Admons::findOrFail($id);
        $admon->delete();

        return redirect()->route('admin.gestores.index')->with('success', 'Administrador eliminado correctamente.');
    }
}



