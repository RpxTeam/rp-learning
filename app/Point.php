<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Point extends Model
{
    protected $fillable = ['name', 'point'];
    protected $hidden = [];
    public static $searchable = [
    ];
}
