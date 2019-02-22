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
use Validator;

class QuestionsController extends Controller
{
    /**
     * Display all questions with all the answers
     *
     * @param int $course
     * @param int $quiz
     * @return \Illuminate\Http\Response
     */
    public function index($course, $quiz)
    {
        $course = Course::findOrFail($course);
        $quiz = Quiz::findOrFail($quiz);

        $questions = Question::quizQuestions($course->id, $quiz->id);

        if($questions->isEmpty()){
            return response()->json(400);
        }else{

            $data = collect();
            
            foreach($questions as $question){
                $data->push(Question::questionAnswers($question->id));
            }
            
            return response()->json($data, 200);
        }
    }
        
    /**
     * Display specific question with all the answers
     *
     * @param int $course
     * @param int $quiz
     * @param int $question
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
     * Store new question with the answers
     *
     * @param  \Illuminate\Http\Request  $request
     * @param int $course
     * @param int $quiz
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $course, $quiz)
    {
        $validator = Validator::make($request->all(),[
            'text' => 'nullable|string',
            'active' => 'nullable|numeric',
            'course_id' => 'nullable|numeric',
            'lesson_id' => 'nullable|numeric',
            'quiz_id' => 'nullable|numeric',
            // 'content' => 'nullable|json',
        ],[
            // 'content' => 'O formulário é inválido.'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $course = Course::findOrFail($course);
        $quiz = Quiz::findOrFail($quiz);
        
        $data = json_decode($request->getContent(), true);

        // dd($data);
        if($data['question']['course_id'] == null){
            $data['question']['course_id'] = $course->id;
        }

        if($data['question']['quiz_id'] == null){
            $data['question']['quiz_id'] = $quiz->id;
        }
        
        $question = Question::create($data['question']);

        foreach($data['question']['answers'] as $answer){
            $a = Answer::create($answer);
            DB::table('question_answer')->insert([
                'question_id' => $question->id,
                'answer_id' => $a->id
            ]);

        }

        DB::table('quiz_question')->insert([
            'quiz_id' => $quiz->id,
            'question_id' => $question->id
        ]);

        return response()->json($question->id,200);
    }
    
    /**
     * Update specific question and all answers
     *
     * @param  \Illuminate\Http\Request  $request
     * @param int $course
     * @param int $quiz
     * @param int $question
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $course, $quiz, $question)
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
        $quiz = Quiz::findOrFail($quiz);
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
     * Delete specific question and answers
     * 
     * @param int $course
     * @param int $quiz
     * @param int $question
     * @return \Illuminate\Http\Response
     */
    public function destroy($course, $quiz, $question)
    {
        $course = Course::findOrFail($course);
        $quiz = Quiz::findOrFail($quiz);
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
