<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $fillable = ['order', 'title', 'slug', 'description', 'content'];
    protected $hidden = [];
    public static $searchable = [
        'title',
        'slug',
        'description',
        'content',
    ];
}
