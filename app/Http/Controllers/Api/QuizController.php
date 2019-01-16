<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Quiz;
use App\Course;

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

        return response()->json(201);
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

        $quiz = Quiz::whereId($quiz->id)->update($request->All());

        return response()->json(204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //deletar em cascada(quiz > questions > answers)
    }
}
