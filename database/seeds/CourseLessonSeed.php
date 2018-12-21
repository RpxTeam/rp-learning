<?php

use Illuminate\Database\Seeder;

class CourseLessonSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [
            ['course_id' => 1 , 'lesson_id' => 1,],
            ['course_id' => 1 , 'lesson_id' => 2,],
            ['course_id' => 1 , 'lesson_id' => 3,],
            ['course_id' => 1 , 'lesson_id' => 4,],
            ['course_id' => 1 , 'lesson_id' => 5,],
            ['course_id' => 1 , 'lesson_id' => 6,],

            // ['course_id' => 2 , 'lesson_id' => 7,],
            // ['course_id' => 2 , 'lesson_id' => 8,],
            // ['course_id' => 2 , 'lesson_id' => 9,],
            // ['course_id' => 2 , 'lesson_id' => 10,],
            // ['course_id' => 2 , 'lesson_id' => 11,],
            // ['course_id' => 2 , 'lesson_id' => 12,],

            // ['course_id' => 3 , 'lesson_id' => 9,],
            // ['course_id' => 3 , 'lesson_id' => 10,],
            // ['course_id' => 3 , 'lesson_id' => 11,],
            // ['course_id' => 3 , 'lesson_id' => 12,],

            // ['course_id' => 4 , 'lesson_id' => 7,],
            // ['course_id' => 4 , 'lesson_id' => 8,],
            // ['course_id' => 4 , 'lesson_id' => 9,],
            // ['course_id' => 4 , 'lesson_id' => 10,],
            // ['course_id' => 4 , 'lesson_id' => 11,],
            // ['course_id' => 4 , 'lesson_id' => 12,],

            // ['course_id' => 5 , 'lesson_id' => 8,],
            // ['course_id' => 5 , 'lesson_id' => 10,],
            // ['course_id' => 5 , 'lesson_id' => 14,],

            // ['course_id' => 6 , 'lesson_id' => 11,],
            // ['course_id' => 6 , 'lesson_id' => 12,],
            // ['course_id' => 6 , 'lesson_id' => 13,],
            // ['course_id' => 6 , 'lesson_id' => 14,],

            // ['course_id' => 7 , 'lesson_id' => 13,],
            // ['course_id' => 7 , 'lesson_id' => 14,],
            // ['course_id' => 7 , 'lesson_id' => 15,],
            // ['course_id' => 7 , 'lesson_id' => 16,],

            // ['course_id' => 8 , 'lesson_id' => 12,],

            // ['course_id' => 9 , 'lesson_id' => 8,],
            // ['course_id' => 9 , 'lesson_id' => 9,],
            // ['course_id' => 9 , 'lesson_id' => 14,],

            // ['course_id' => 10 , 'lesson_id' => 11,],
            // ['course_id' => 10 , 'lesson_id' => 13,],
            // ['course_id' => 10 , 'lesson_id' => 15,],
        ];

        foreach ($items as $item) {
            DB::table('course_lesson')->insert([
                'course_id' => $item["course_id"],
                'lesson_id' => $item["lesson_id"],
            ]);
        };
    }
}
