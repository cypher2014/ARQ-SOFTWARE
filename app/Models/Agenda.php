<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Agenda extends Model
{
    use HasFactory;

    protected $table = 'agenda';
    protected $primaryKey = 'id_agenda';
    public $timestamps = true;

    protected $fillable = [
        'id_user',
        'date_recolection',
        'status_recolection',
        'user_message',
    ];


    // Relaciones
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    public function recolections()
    {
        return $this->hasMany(Recolection::class, 'id_agenda', 'id_agenda');
    }
}
