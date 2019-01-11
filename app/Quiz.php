<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = ['title'];
    protected $hidden = [];
    public static $searchable = [
    ];

    public function questions()
    {
        return $this->belongsToMany(Question::class, 'quiz_question')->withTrashed();
    }
}
