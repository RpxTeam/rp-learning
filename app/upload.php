<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class upload extends Model
{
    protected $fillable = ['file'];
    protected $hidden = [];
    public static $searchable = [
    ];
}
