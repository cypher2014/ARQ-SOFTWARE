<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $table = 'users'; // por si el nombre no coincide

    protected $primaryKey = 'id_user'; 

    protected $fillable = [
        'type_document',
        'name_user',
        'last_name',
        'email',
        'password',
        'user_phone',
        'user_address',
        'city',
        'edit_data',
        'delete_data',
        'view_data',
    ];

    protected $hidden = [
        'password',
    ];
}

