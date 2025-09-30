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
    /**
     * Mostrar formulario para crear una cita.
     */
    public function create(): Response
    {
        return Inertia::render('Appointment/Appointment'); 
    }

    /**
     * Guardar una nueva cita en la base de datos.
     */
    public function store(Request $request): RedirectResponse
    {
        // Validar campos según tu modelo
        $request->validate([
            'date_recolection' => 'required|date',
            'user_message'     => 'nullable|string|max:500',
        ]);

        // Crear registro en la tabla "agenda"
        Agenda::create([
            'id_user'            => Auth::id(), 
            'date_recolection'   => $request->date_recolection,
            'status_recolection' => 'pendiente',
            'user_message'       => $request->user_message,
        ]);

        return redirect()->route('dashboard')
            ->with('success', 'Solicitud ha sido creada');
    }

    /**
     * Listar todas las citas del usuario autenticado.
     */
    public function index(): Response
    {
        $appointment = Agenda::where('id_user', Auth::id())
            ->orderByDesc('date_recolection')
            ->get();

        return Inertia::render('Appointment/AppointmentList', [
            'appointment' => $appointment,
        ]);
    }

    public function edit(Agenda $appointment)
    {

        if ($appointment->id_user !== Auth::id()) {
            abort(403, 'No autorizado');
        }

        return Inertia::render('Appointment/EditAppointment', [
            'appointment' => $appointment,
        ]);
    }

    public function update(Request $request, Agenda $appointment)
    {

    if ($appointment->id_user !== Auth::id()) {
        abort(403, 'No autorizado');
    }

    $request->validate([
        'date_recolection' => 'required|date',
        'user_message'     => 'nullable|string|max:500',
    ]);

    $appointment->update([
        'date_recolection' => $request->date_recolection,
        'user_message'     => $request->user_message,
    ]);

    return redirect()
        ->route('appointment.index')
        ->with('success', 'Solicitud actualizada correctamente.');
    }


    public function show(Agenda $appointment)
    {
        if ($appointment->id_user !== Auth::id()) {
            abort(403, 'No autorizado');
        }

        return Inertia::render('Appointment/ShowAppointment', [
            'appointment' => $appointment,
    ]);

    }
}
