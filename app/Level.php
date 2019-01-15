<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    protected $fillable = ['level', 'point'];
    protected $hidden = [];
    public static $searchable = [
    ];
}
