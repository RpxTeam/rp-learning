<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'course_quiz')->withTrashed();
    }

    public static function courseQuiz($course){

        $quiz = DB::table('course_quiz')
                    ->leftjoin('quizzes','course_quiz.quiz_id','=','quizzes.id')
                    ->where('course_id', $course)
                    ->get();

        return $quiz;
    }

    public static function quizQuestion($quiz){
        $quiz = Quiz::findOrFail($quiz);

        $questions = DB::table('quiz_question')
                        ->leftjoin('questions','quiz_question.question_id','=','questions.id')
                        ->where('quiz_id',$quiz->id)
                        ->get();
    }
}
