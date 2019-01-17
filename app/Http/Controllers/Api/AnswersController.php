<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Answer;
use App\Question;

class AnswersController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $question)
    {
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
    public function update(Request $request, $question, $answer)
    {
        $question = Question::findOrFail($question);
        $Answer = Answer::findOrFail($Answer);

        $answer = Answer::whereId($answer->id)->update($request->All());

        return response()->json(204);
        //204: No content. When an action was executed successfully, but there is no content to return.
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($question, $answer)
    {
        $question = Question::findOrFail($question);
        $Answer = Answer::findOrFail($Answer);

        $answer->delete();
        DB::table('question_answer')
            ->where('question_id','=', $question->id)
            ->where('answer_id','=', $answer->id)
            ->delete();

            return response()->json(204);
            //204: No content. When an action was executed successfully, but there is no content to return.
    }
}
