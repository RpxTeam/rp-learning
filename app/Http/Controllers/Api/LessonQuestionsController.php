<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Course;
use App\Lesson;
use App\Answer;
use App\Question;
use Validator;


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

        return response()->json($question, 200);
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
        $validator = Validator::make($request->all(),[
        'text' => 'nullable|string',
        'active' => 'nullable|numeric',
        'course_id' => 'nullable|numeric',
        'lesson_id' => 'nullable|numeric',
        'quiz_id' => 'nullable|numeric',
        // 'content' => 'nullable|json',
    ],[
        // 'text.required' => 'O campo texto está vazio.',
        // 'content' => 'O formulário é inválido.'
    ]);

    if($validator->fails()){
        return response()->json($validator->errors(), 400);
    }

    $course = Course::findOrFail($course);
    $lesson = Lesson::findOrFail($lesson);
    
    $data = json_decode($request->getContent(), true);

    if($data['question']['course_id'] == null){
        $data['question']['course_id'] = $course->id;
    }

    if($data['question']['lesson_id'] == null){
        $data['question']['lesson_id'] = $lesson->id;
    }
    
    $question = Question::create($data['question']);

    foreach($data['answers'] as $answer){
        $a = Answer::create($answer);
        DB::table('question_answer')->insert([
            'question_id' => $question->id,
            'answer_id' => $a->id
        ]);
    }
        return response()->json($question->id, 200);
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
        $validator = Validator::make($request->all(),[
            'text' => 'nullable|string',
            'active' => 'nullable|numeric',
            'course_id' => 'nullable|numeric',
            'lesson_id' => 'nullable|numeric',
            'quiz_id' => 'nullable|numeric',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

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
