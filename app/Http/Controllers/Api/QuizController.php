<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Quiz;
use App\Course;
use App\Question;
use App\Answer;

class QuizController extends Controller
{
    /**
     * Display all quizzes of the specific course.
     *
     * @param int $course
     * @return \Illuminate\Http\Response
     */
    public function index($course)
    {
        $course = Course::findOrFail($course);
        
        $quiz = DB::table('course_quiz')
                    ->where('course_id', $course->id)
                    ->first();
        
        if(empty($quiz)){
            return response()->json(400);
        }else{
            return response()->json($quiz->quiz_id, 200);
        }
    }

    /**
     * Display specific quiz of the specific course.
     *
     * @param  int  $course
     * @param  int  $quiz
     * @return \Illuminate\Http\Response
     */
    public function show($course, $quiz)
    {
        $course = Course::findOrFail($course);
        $quiz = Quiz::findOrFail($quiz);

        $quiz = Quiz::courseQuiz($course->id)
                ->where('course_id', $course->id)
                ->where('quiz_id', $quiz->id)
                ->first();

        if($quiz != null){
            return response()->json($quiz, 200);
        }else{
            return response()->json(400);
        }
    }

    /**
     * Store new quiz of the specific course.
     *
     * @param  int  $course
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $course)
    {
        $course = Course::findOrFail($course);

        $quiz = Quiz::create($request->All());

        DB::table('course_quiz')->insert([
            'course_id' => $course->id,
            'quiz_id' => $quiz->id
        ]);

        return response()->json($quiz->id,200);
    }
    
    /**
     * Update specific quiz of the specific course.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $course
     * @param  int  $quiz
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $course, $quiz)
    {
        $course = Course::findOrFail($course);
        $quiz = Quiz::findOrFail($quiz);

        $quiz = Quiz::whereId($quiz->id)->update($request->except(['_method',]));

        return response()->json(204);
    }

    /**
     * Delete specific quiz with all questions and answers of the specific course.
     *
     * @param  int  $course
     * @param  int  $quiz
     * @return \Illuminate\Http\Response
     */
    public function destroy($course, $quiz)
    {
        $course = Course::findOrFail($course);
        $quiz = Quiz::findOrFail($quiz);

        $questions = Question::quizQuestions($course->id,$quiz->id);
        
        foreach($questions as $question){
            
            $answers = Answer::questionAnswers($question->id);
            
            foreach($answers as $answer){
                DB::table('question_answer')
                ->where('question_id', $question->question_id)
                ->where('answer_id', $answer->answer_id)
                ->delete();
                
                DB::table('answers')
                ->whereId($answer->id)
                ->delete();
            }
            DB::table('quiz_question')
            ->where('quiz_id', $quiz->quiz_id)
            ->where('question_id', $question->question_id)
            ->delete();
            
            // dd($question->id);
            DB::table('questions')
                ->whereId($question->id)
                ->delete();
        }

        DB::table('quizzes')
                ->whereId($quiz->id)
                ->delete();
            
        return response()->json(204);
        //204: No content. When an action was executed successfully, but there is no content to return.
    }

    /**
     * Display all questions with answers of final quiz of specific course.
     *
     * @param  int  $course
     * @return \Illuminate\Http\Response
     */
    public function final($course){
        $course = Course::findOrFail($course);

        $questions = DB::table('questions')
                    ->where('active', 1)
                    ->where('course_id',$course->id)
                    ->get();

        if(empty($questions)){
            $data = collect();

        foreach($questions as $question){
            $data->push(Question::questionAnswers($question->id));
        }

            return response()->json($data, 200);
        }else{
            return response()->json(400);
        }
    }

    /**
     * Display all questions of specific course.
     *
     * @param  int  $course
     * @return \Illuminate\Http\Response
     */
    public function questions($course){
        $course = Course::findOrFail($course);

        $questions = DB::table('questions')
                    ->where('course_id',$course->id)
                    ->get();

        if($questions != null){
            return response()->json($questions, 200);
        }else{
            return response()->json(400);
        }
    }

    /**
     * Activate Final quiz
     *
     * @param  int  $course
     * @return \Illuminate\Http\Response
     */
    public function activateFinal($course){
        $course = Course::findOrFail($course);

        $questions = DB::table('questions')
                    ->where('course_id',$course->id)
                    ->update(['active' => 1]);

        return response()->json(204);
    }

    /**
     * Deactivate Final quiz
     *
     * @param  int  $course
     * @return \Illuminate\Http\Response
     */
    public function desactivateFinal($course){
        $course = Course::findOrFail($course);

        $questions = DB::table('questions')
                    ->where('course_id',$course->id)
                    ->update(['active' => 0]);

        return response()->json(204);
    }

    /**
     * Update specific question of specific course
     *
     * @param  int  $course
     * @param  int  $question
     * @return \Illuminate\Http\Response
     */
    public function updateQuestion(Request $request, $course, $question){
        $course = Course::findOrFail($course);
        $question = Question::findOrFail($question);

        Question::whereId($question->id)->update($request->all());

        return response()->json(204);
    }

    /**
     * Show if course is activate
     *
     * @param int $course
     * @return \Illuminate\Http\Response
     */
    public function quizFinalActive($course)
    {
        $course = Course::findOrFail($course);
        
        $quiz = DB::table('course_quiz')
                    ->leftjoin('quizzes', 'course_quiz.quiz_id', 'quizzes.id')
                    ->where('course_id', $course->id)
                    ->first();
        
        if(empty($quiz)){
            return response()->json(400);
        }else{
            return response()->json($quiz->active, 200);
        }
    }

    /**
     * Get all questions with answers of specific course.
     *
     * @param int $course
     * @param int $question
     * @return \Illuminate\Http\Response
     */
    public function courseQuestions($course, $question){
        $course = Course::findOrFail($course);

        $question = Question::findOrFail($question);

        $question = DB::table('questions')
                    ->where('course_id',$course->id)
                    ->where('id',$question->id)
                    ->first();

        $question = Question::questionAnswers($question->id);

        if(!empty($question)){
            return response()->json($question, 200);
        }else{
            return response()->json(400);
        }
    }
}