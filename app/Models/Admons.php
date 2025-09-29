<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Hash;

class Admons extends Authenticatable
{
    use HasFactory;

    protected $table = 'admons_users';
    protected $primaryKey = 'id_users';
    public $timestamps = true;

    protected $fillable = [
        'name_user',
        'last_name',
        'email',
        'password',
        'user_phone',
        'user_position',
        'city',
        'role_admon',
        'role_courier',
        'role_gestor',
    ];

    protected $hidden = [
        'password',
    ];

    // 🔸 Laravel usará esta columna como "username" para autenticación
    public function getAuthIdentifierName()
    {
        return 'email';
    }

    // 🔸 Laravel usará este campo como contraseña
    public function getAuthPassword()
    {
        return $this->password;
    }

    // 🔸 Encriptar contraseña automáticamente
    public function setPasswordAttribute($value)
    {
        if (!empty($value)) {
            $this->attributes['password'] = Hash::make($value);
        }
    }
}


