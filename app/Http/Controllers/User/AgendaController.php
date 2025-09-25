<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Agenda;
use Illuminate\Support\Facades\Auth;

class AgendaController extends Controller
{
 
    public function create(): Response
    {
        return Inertia::render('Appointment/Appointment'); 
    }


    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'date_recolection' => 'required|date',
            'user_message' => 'nullable|string|max:500',
        ]);

        Agenda::create([
            'id_user' => Auth::id(),
            'date_recolection' => $request->date_recolection,
            'status_recolection' => 'pendiente',
            'user_message' => $request->user_message,
        ]);

        return redirect()->route('dashboard')->with('success', 'Solicitud a sido creada');
    }
}

