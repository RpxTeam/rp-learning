<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Course;
use App\Lesson;
use App\Quiz;

class Question extends Model
{
    protected $fillable = ['text','active','course_id', 'lesson_id', 'quiz_id'];
    protected $hidden = [];
    public static $searchable = [
    ];

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id')->withTrashed();
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class, 'lesson_id')->withTrashed();
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class, 'quiz_id')->withTrashed();
    }

    public function answers()
    {
        return $this->belongsToMany(Answer::class, 'question_answer')->withTrashed();
    }

    

    public static function quizQuestions($course, $quiz){

        $questions = DB::table('questions')
                    ->where('course_id', $course)
                    ->where('quiz_id', $quiz)
                    ->get();
        
        return $questions;
    }

    public static function questionAnswers($question){
        $question = Question::findOrFail($question);

       
       $answers = Question::onlyAnswers($question->id);
       
       $question->setAttribute('answers',$answers);
        
        return $question;
    }

    public static function onlyAnswers($question){
        $question = Question::findOrFail($question);

        $answers = DB::table('question_answer')
                    ->leftjoin('answers', 'question_answer.answer_id','=','answers.id')
                    ->where('question_id',$question->id)
                    ->get();
        
        return $answers;
    }

    public static function lessonQuestion($course, $lesson){

        $question = DB::table('questions')
                    ->where('course_id', $course)
                    ->where('lesson_id', $lesson)
                    ->first();
        
        $question = Question::findOrFail($question->id);

        $answers = Question::onlyAnswers($question->id);

        $question->setAttribute('answers',$answers);

        return $question;
    }
}
