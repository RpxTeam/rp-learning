<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Answer extends Model
{
    protected $fillable = ['text','correct'];
    protected $hidden = [];
    public static $searchable = [
    ];

    public static function questionAnswers($question){

        $answers = DB::table('question_answer')
                    ->leftjoin('answers','question_answer.answer_id','=','answers.id')
                    ->where('question_id', $question)
                    ->get();

        return $answers;
    }
}
