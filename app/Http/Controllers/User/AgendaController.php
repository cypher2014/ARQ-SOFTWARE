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
            'DATE_RECOLECTION' => 'required|date',
            'USER_MESSAGE'     => 'nullable|string|max:500',
        ]);

        // Crear registro en la tabla "agenda"
        Agenda::create([
            'ID_USER'            => Auth::id(), 
            'DATE_RECOLECTION'   => $request->DATE_RECOLECTION,
            'STATUS_RECOLECTION' => 'pendiente',
            'USER_MESSAGE'       => $request->USER_MESSAGE,
        ]);

        return redirect()->route('dashboard')
            ->with('success', 'Solicitud ha sido creada');
    }

    /**
     * Listar todas las citas del usuario autenticado.
     */
    public function index(): Response
    {
        $appointment = Agenda::where('ID_USER', Auth::id())
            ->orderByDesc('DATE_RECOLECTION')
            ->get();

        return Inertia::render('Appointment/AppointmentList', [
            'appointment' => $appointment,
        ]);
    }

    public function edit(Agenda $appointment)
    {

        if ($appointment->ID_USER !== Auth::id()) {
            abort(403, 'No autorizado');
        }

        return Inertia::render('Appointment/EditAppointment', [
            'appointment' => $appointment,
        ]);
    }

    public function update(Request $request, Agenda $appointment)
    {
        
        if ($appointment->ID_USER !== Auth::id()) {
            abort(403, 'No autorizado');
        }
        
        $request->validate([
            'date_recolection' => 'required|date',
            'user_message' => 'nullable|string|max:500',
        ]);

        $appointment->update([
            'DATE_RECOLECTION' => $request->DATE_RECOLECTION,
            'USER_MESSAGE'     => $request->USER_MESSAGE,
        ]);

        return redirect()
            ->route('appointment.index')
            ->with('success', 'Solicitud actualizada correctamente.');
    }

    public function show(Agenda $appointment)
    {
        if ($appointment->ID_USER !== Auth::id()) {
            abort(403, 'No autorizado');
        }

        return Inertia::render('Appointment/ShowAppointment', [
            'appointment' => $appointment,
    ]);

    }
}
