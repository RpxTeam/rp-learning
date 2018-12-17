<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $fillable = ['name','description'];
    protected $hidden = [];
    public static $searchable = [
    ];
    
}
