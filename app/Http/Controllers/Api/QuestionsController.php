<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Quiz;
use App\Course;
use App\Question;
use App\Answer;
use App\Level;

class QuestionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($course, $quiz)
    {
        $course = Course::findOrFail($course);
        $quiz = Quiz::findOrFail($quiz);

        $questions = Question::quizQuestions($course->id, $quiz->id);

        $data = collect();

        foreach($questions as $question){
            $data->push(Question::questionAnswers($question->question_id));
        }

        return response()->json($data, 200);
        // return response()->json(array('course'=>$mycourse,'lessons'=>$lessons),200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($course, $quiz, $question)
    {
        $course = Course::findOrFail($course);
        $quiz = Quiz::findOrFail($quiz);
        $question = Question::findOrFail($question);

        $question = Question::questionAnswers($question->id);

        return response()->json($question, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $course, $quiz)
    {
        $course = Course::findOrFail($course);
        $quiz = Quiz::findOrFail($quiz);

        $question = question::create($request->All());

        DB::table('quiz_question')->insert([
            'quiz_id' => $quiz->id,
            'question_id' => $question->id
        ]);

        return response()->json(201);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $course, $quiz, $question)
    {
        $course = Course::findOrFail($course);
        $quiz = Quiz::findOrFail($quiz);
        $question = Question::findOrFail($question);

        $question = Question::whereId($question->id)->update($request->except(['_method',]));

        return response()->json(204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($course, $quiz, $question)
    {
        $course = Course::findOrFail($course);
        $quiz = Quiz::findOrFail($quiz);
        $question = Question::findOrFail($question);

        $answers = Question::onlyAnswers($question->id);

        // dd($answers);
        foreach($answers as $answer){
            DB::table('question_answer')
            ->where('question_id', $question->id)
            ->where('answer_id', $answer->id)
            ->delete();

            DB::table('answers')
            ->where('id',$answer->id)
            ->delete();
        }

        $question->delete();

        return response()->json(204);
            //204: No content. When an action was executed successfully, but there is no content to return.
    }
}
