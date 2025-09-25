<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Hash;

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
    ];

    protected $hidden = [
        'PASSWORD',
    ];

    // Mutator para encriptar password automáticamente
    public function setPASSWORDAttribute($value)
    {
        $this->attributes['PASSWORD'] = Hash::make($value);
    }
}
