<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * Nombre de la tabla
     */
    protected $table = 'users';

    /**
     * Clave primaria personalizada
     */
    protected $primaryKey = 'ID_USER';

    /**
     * Laravel espera por defecto que la PK sea autoincremental tipo int
     */
    public $incrementing = true;
    protected $keyType = 'int';

    /**
     * Manejo de timestamps automáticos (CREATED_AT, UPDATED_AT)
     */
    public $timestamps = true;

    /**
     * Campos que se pueden asignar masivamente
     */
    protected $fillable = [
        'TYPE_DOCUMENT',
        'NAME_USER',
        'LAST_NAME',
        'EMAIL',
        'PASSWORD',
        'USER_PHONE',
        'USER_ADDRESS',
        'CITY',
        'EDIT_DATA',
        'DELETE_DATA',
        'VIEW_DATA',
    ];

    /**
     * Campos ocultos en serialización
     */
    protected $hidden = [
        'PASSWORD',
        'remember_token',
    ];

    /**
     * Casts para tipos de datos
     */
    protected function casts(): array
    {
        return [
            'PASSWORD' => 'hashed',
            'EDIT_DATA' => 'boolean',
            'DELETE_DATA' => 'boolean',
            'VIEW_DATA' => 'boolean',
        ];
    }

    /**
     * Relación: un usuario puede tener muchas agendas
     */
    public function agendas()
    {
        return $this->hasMany(Agenda::class, 'ID_USER', 'ID_USER');
    }
}

