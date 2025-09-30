<?php

namespace App\Http\Controllers;

use App\Models\Articles;
use Inertia\Inertia;

class MaterialsQuantityController extends Controller
{
    // Mostrar cantidad de todos los materiales
    public function index()
    {
        $quantities = Articles::select('NAME_MATERIALS', 'QUANTITY')->get();

        return Inertia::render('Materials/Quantity', [
            'quantities' => $quantities
        ]);
    }
}

