<?php

use Illuminate\Database\Seeder;

class QuizQuestionSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [
            ['quiz_id'=> 1,'question_id'=>1],
            ['quiz_id'=> 1,'question_id'=>2],
            ['quiz_id'=> 1,'question_id'=>3],

            ['quiz_id'=> 2,'question_id'=>4],
            ['quiz_id'=> 2,'question_id'=>5],
            ['quiz_id'=> 2,'question_id'=>6],
        ];

        foreach ($items as $item) {
            DB::table('quiz_question')
            ->insert($item);
        }
    }
}
