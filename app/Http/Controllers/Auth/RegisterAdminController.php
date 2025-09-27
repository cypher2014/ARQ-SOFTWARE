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
        $admons = Admons::orderBy('ID_USERS', 'desc')->get();

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
            'ID_USERS'      => 'required|numeric|unique:admons_users,ID_USERS',
            'NAME_USER'     => 'required|string|max:100',
            'LAST_NAME'     => 'required|string|max:100',
            'EMAIL'         => 'required|email|unique:admons_users,EMAIL',
            'PASSWORD'      => 'required|min:6',
            'USER_PHONE'    => 'nullable|string|max:20',
            'USER_POSITION' => 'nullable|string|max:100',
            'CITY'          => 'nullable|string|max:100',
        ]);

        // Roles por defecto
        $validated['ROLE_ADMON'] = 0;
        $validated['ROLE_COURIER'] = 0;
        $validated['ROLE_GESTOR'] = 1;

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
            'NAME_USER'     => 'required|string|max:100',
            'LAST_NAME'     => 'required|string|max:100',
            'EMAIL'         => 'required|email|unique:admons_users,EMAIL,' . $id . ',ID_USERS',
            'PASSWORD'      => 'nullable|min:6',
            'USER_PHONE'    => 'nullable|string|max:20',
            'USER_POSITION' => 'nullable|string|max:100',
            'CITY'          => 'nullable|string|max:100',
        ]);

        // Roles por defecto
        $validated['ROLE_ADMON'] = 0;
        $validated['ROLE_COURIER'] = 0;
        $validated['ROLE_GESTOR'] = 1;

        if (empty($validated['PASSWORD'])) {
            unset($validated['PASSWORD']);
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


