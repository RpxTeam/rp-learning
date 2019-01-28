<?php

use Illuminate\Database\Seeder;

class CourseQuizSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [
            ['course_id'=> 1,'quiz_id'=>1],
            ['course_id'=> 1,'quiz_id'=>2],
        ];

        foreach ($items as $item) {
            DB::table('course_quiz')
            ->insert($item);
        }

    }
}
