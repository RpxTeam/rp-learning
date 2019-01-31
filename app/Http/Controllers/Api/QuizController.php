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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($course)
    {
        $course = Course::findOrFail($course);
        
        $quiz = Quiz::courseQuiz($course->id);
        //colocar total de questoes(criar na model)

        return response()->json($quiz, 200);
        // return response()->json(array('course'=>$mycourse,'lessons'=>$lessons),200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($course, $quiz)
    {
        $course = Course::findOrFail($course);
        $quiz = Quiz::findOrFail($quiz);

        $quiz = Quiz::courseQuiz($course->id)
                ->where('quiz_id', $quiz->id)
                ->first();

        return response()->json($quiz, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
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
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($course, $quiz)
    {
        $course = Course::findOrFail($course);
        $quiz = Quiz::findOrFail($quiz);

        $questions = Question::quizQuestions($quiz->id);
        
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
    }
    