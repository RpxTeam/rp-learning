<?php

use Illuminate\Database\Seeder;

class QuestionSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        App\Question::create(['id'=> 1,
                             'text' => 'In the In the mid-1990s, game engines recreated true 3D worlds with arbitrary level geometry instead of...',
                             'active' => 1,
                             'course_id' => 1,
                             'lesson_id' => 1]);

        // for($i=0;$i<10;$i++){
        //     App\Question::create([
        //         'text' => $faker->word,
        //         'active' => $faker->numberBetween(0,1),
        //         'course_id' => '1',
        //         'quiz_id' => '1',
        //         ]);
        // }
    }
}
