<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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

    public static function quizQuestions($quiz){

        $questions = DB::table('quiz_question')
                    ->leftjoin('questions','quiz_question.question_id','=','questions.id')
                    ->where('quiz_id', $quiz)
                    ->get();

        return $questions;
    }

    public static function questionAnswers($question){
        $question = Question::findOrFail($question);

        $answers = DB::table('question_answer')
                    ->leftjoin('answers', 'question_answer.answer_id','=','answers.id')
                    ->where('question_id',$question->id)
                    ->get();
        
        return array('question'=>$question,'answers'=> $answers);
    }

    public static function onlyAnswers($question){
        $question = Question::findOrFail($question);

        $answers = DB::table('question_answer')
                    ->leftjoin('answers', 'question_answer.answer_id','=','answers.id')
                    ->where('question_id',$question->id)
                    ->get();
        
        return $answers;
    }
}
