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
     * Store new answer of specific question of lesson.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param int $course
     * @param int $lesson
     * @param int $question
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
     * Update specific answer of specific question of lesson.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param int $course
     * @param int $lesson
     * @param int $question
     * @param int $answer
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
     * delete specific answer of specific question of lesson.
     *
     * @param int $course
     * @param int $lesson
     * @param int $question
     * @param int $answer
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
