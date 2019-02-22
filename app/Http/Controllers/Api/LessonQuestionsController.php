<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Course;
use App\Answer;
use App\Lesson;
use App\Question;
use Validator;


class LessonQuestionsController extends Controller
{
    /**
     * Display all questions of specific lesson
     *
     * @param int $course
     * @param int $lesson
     * @return \Illuminate\Http\Response
     */
    public function index($course, $lesson)
    {
        $course = Course::findOrFail($course);
        $lesson = Lesson::findOrFail($lesson);

        $question = Question::lessonQuestion($course->id, $lesson->id);

        if($question != null) {
            return response()->json($question, 200);
        } else {
            return response()->json(400);
        }
    }

    /**
     * Display specific questions of specific lesson
     *
     * @param int $course
     * @param int $lesson
     * @param int $question
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
     * Store new question and answers of the specific lesson.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param int $course
     * @param int $lesson
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

    foreach($data['question']['answers'] as $answer){
        $a = Answer::create($answer);
        DB::table('question_answer')->insert([
            'question_id' => $question->id,
            'answer_id' => $a->id
        ]);
    }
        return response()->json($question->id, 200);
    }

    /**
     * Update specific question and answers of the specific lesson.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param int $course
     * @param int $lesson
     * @param int $question
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

        $data = json_decode($request->getContent(), true);
        
        $question = Question::whereId($question->id)->update([
            'id' => $data['question']['id'],
            'text' => $data['question']['text'],
            'active' => $data['question']['active'],
            'course_id' => $data['question']['course_id'],
            'lesson_id' => $data['question']['lesson_id'],
            'quiz_id' => $data['question']['quiz_id'],
        ]);

        foreach($data['question']['answers'] as $answer){
            Answer::whereId($answer['id'])->update([
                'text' => $answer['text'],
                'correct' => $answer['correct'],
            ]);
        }

        return response()->json(204);
    }

    /**
     * Delete specific question with answers of specific lesson.
     *
     * @param int $course
     * @param int $lesson
     * @param int $question
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
