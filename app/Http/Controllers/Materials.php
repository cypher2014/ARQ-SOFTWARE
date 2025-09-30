<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Articles;
use Inertia\Inertia;

class Materials extends Controller
{
    public function index()
    {
        $materials = Articles::all();
        return Inertia::render('Materials/Index', ['materials' => $materials]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'NAME_MATERIALS' => 'required|string|max:255',
            'PRICE_MATERIAL' => 'required|numeric',
            'QUANTITY' => 'required|integer',
        ]);

        Articles::create($validated);

        // ✅ Devuelve JSON para que React maneje la UI
        return response()->json([
            'success' => true,
            'message' => 'Material creado correctamente'
        ]);
    }

    public function destroy($id)
    {
        $material = Articles::findOrFail($id);
        $material->delete();

        return response()->json([
            'success' => true,
            'message' => 'Material eliminado correctamente'
        ]);
    }

    public function show($id)
    {
        $material = Articles::findOrFail($id);
        return Inertia::render('Materials/Show', ['material' => $material]);
    }
}
