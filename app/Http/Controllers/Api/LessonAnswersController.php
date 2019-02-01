<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Course;
use App\Lesson;
use App\Quiz;
use App\Question;
use App\Answer;

class LessonAnswersController extends Controller
{
   /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,$course, $lesson, $question)
    {
        $course = Course::findOrFail($course);
        $lesson = Lesson::findOrFail($lesson);
        $question = Question::findOrFail($question);

        $answer = Answer::create($request->All());

        DB::table('question_answer')->insert([
            'question_id' => $question->id,
            'answer_id' => $answer->id
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
    public function update(Request $request,$course, $lesson, $question, $answer)
    {
        $course = Course::findOrFail($course);
        $lesson = Lesson::findOrFail($lesson);
        $question = Question::findOrFail($question);
        $answer = Answer::findOrFail($answer);

        $answer = Answer::whereId($answer->id)->update($request->except(['_method',]));

        return response()->json(204);
        //204: No content. When an action was executed successfully, but there is no content to return.
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($course, $lesson, $question, $answer)
    {
        $course = Course::findOrFail($course);
        $lesson = Lesson::findOrFail($lesson);
        $question = Question::findOrFail($question);
        $answer = Answer::findOrFail($answer);

        DB::table('question_answer')
        ->where('question_id','=', $question->id)
        ->where('answer_id','=', $answer->id)
        ->delete();
        $answer->delete();

            return response()->json(204);
            //204: No content. When an action was executed successfully, but there is no content to return.
    }
}
