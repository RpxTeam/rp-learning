<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $fillable = ['text'];
    protected $hidden = [];
    public static $searchable = [
    ];

}
