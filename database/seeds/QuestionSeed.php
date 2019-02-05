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
                'active' => 1,
            ]);
        }
    }
}
