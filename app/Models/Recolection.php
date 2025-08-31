<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Recolection extends Model
{
     use HasFactory;

    protected $table = 'recolection';
    protected $primaryKey = 'ID_RECOLECTION';
    public $timestamps = true;

    protected $fillable = [
        'ID_AGENDA',
        'TOTAL_RECOLECTION',
        'TOTAL_PRICE',
        'OBSERVATION',
    ];

    // Relaciones
    public function agenda()
    {
        return $this->belongsTo(Agenda::class, 'ID_AGENDA', 'ID_AGENDA');
    }
}
