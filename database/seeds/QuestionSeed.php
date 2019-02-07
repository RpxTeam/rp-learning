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

        for($i=0;$i<10;$i++){
            App\Question::create([
                'text' => $faker->word,
                'active' => $faker->numberBetween(0,1),
                'course_id' => '1',
                'quiz_id' => '1',
                ]);
        }
    }
}
