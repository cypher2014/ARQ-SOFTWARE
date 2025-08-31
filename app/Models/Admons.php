<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Admons extends Model
{
    use HasFactory;

    protected $table = 'admons_users';
    protected $primaryKey = 'ID_USERS';
    public $timestamps = true;

    protected $fillable = [
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
    ]; //
}
