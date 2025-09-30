<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Agenda extends Model
{
    use HasFactory;

    protected $table = 'agenda';
    protected $primaryKey = 'ID_AGENDA';
    public $timestamps = true;

    protected $fillable = [
        'ID_USER',
        'DATE_RECOLECTION',
        'STATUS_RECOLECTION',
        'USER_MESSAGE',
    ];


    // Relaciones
    public function user()
    {
        return $this->belongsTo(User::class, 'ID_USER', 'ID_USER');
    }

    public function recolections()
    {
        return $this->hasMany(Recolection::class, 'ID_AGENDA', 'ID_AGENDA');
    }
}
