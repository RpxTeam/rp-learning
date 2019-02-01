<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Course;
use App\Lesson;
use App\Question;


class LessonQuestionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($course, $lesson)
    {
        $course = Course::findOrFail($course);
        $lesson = Lesson::findOrFail($lesson);

        $question = Question::lessonQuestion($course->id, $lesson->id);
        $answers = Question::onlyAnswers($question->id);

        return response()->json(['question'=>$question,'answers'=> $answers], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($course, $lesson, $question)
    {
        $course = Course::findOrFail($course);
        $lesson = Lesson::findOrFail($lesson);
        $question = Question::findOrFail($question);

        $data = Question::questionAnswers($question->id);

        return response()->json($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $course, $lesson)
    {
        $course = Course::findOrFail($course);
        $lesson = Lesson::findOrFail($lesson);

        $question = question::create($request->All() + ['course_id' => $course->id, 'lesson_id' => $lesson->id]);

        return response()->json(204);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $course, $lesson, $question)
    {
        $course = Course::findOrFail($course);
        $lesson = Lesson::findOrFail($lesson);
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
    public function destroy($course, $lesson, $question)
    {
        $course = Course::findOrFail($course);
        $lesson = Lesson::findOrFail($lesson);
        $question = Question::findOrFail($question);
        
        $answers = Question::onlyAnswers($question->id);

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
