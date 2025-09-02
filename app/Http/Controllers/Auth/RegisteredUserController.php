<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Mostrar la vista de registro (React con Inertia).
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Guardar un nuevo usuario en la base de datos.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'id_user' => 'required|string|max:10',
            'type_document' => 'required|string|max:10',
            'name_user'     => 'required|string|max:50',
            'last_name'     => 'required|string|max:50',
            'email'         => 'required|string|lowercase|email|max:150|unique:users,email',
            'password'      => 'required|confirmed|min:8',
            'user_phone'    => 'nullable|string|max:20',
            'user_address'  => 'nullable|string|max:200',
            'city'          => 'nullable|string|max:100',
        ]);

        $user = User::create([
            'id_user' => $request->id_user,
            'type_document' => $request->type_document,
            'name_user'     => $request->name_user,
            'last_name'     => $request->last_name,
            'email'         => $request->email,
            'password'      => Hash::make($request->password),
            'user_phone'    => $request->user_phone,
            'user_address'  => $request->user_address,
            'city'          => $request->city,
            'edit_data'     => 1,
            'delete_data'   => 0,
            'view_data'     => 1,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
