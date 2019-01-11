<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['text','correct'];
    protected $hidden = [];
    public static $searchable = [
    ];

    public function answers()
    {
        return $this->belongsToMany(Answer::class, 'question_answer')->withTrashed();
    }
}
