<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Articles extends Model
{
use HasFactory;

    protected $table = 'materials';
    protected $primaryKey = 'ID_MATERIAL';
    public $timestamps = true;

    protected $fillable = [
        'NAME_MATERIALS',
        'PRICE_MATERIAL',
        'QUANTITY',
    ];
}
