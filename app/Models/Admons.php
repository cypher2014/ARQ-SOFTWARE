<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Hash;

class Admons extends Authenticatable
{
    use HasFactory;

    protected $table = 'admons_users';
    protected $primaryKey = 'ID_USERS';
    public $timestamps = true;

    protected $fillable = [
        'ID_USERS',
        'NAME_USER',
        'LAST_NAME',
        'EMAIL',
        'PASSWORD',
        'USER_PHONE',
        'USER_POSITION',
        'CITY',
        'ROLE_ADMON',
        'ROLE_COURIER',
        'ROLE_GESTOR',
    ];

    protected $hidden = [
        'PASSWORD',
    ];

    // Encriptar contraseña automáticamente
    public function setPASSWORDAttribute($value)
    {
        $this->attributes['PASSWORD'] = Hash::make($value);
    }

    // Laravel usa este método para autenticar
    public function getAuthPassword()
    {
        return $this->PASSWORD;
    }
}

