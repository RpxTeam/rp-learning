<?php

use Illuminate\Database\Seeder;

class AnswerSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        for($i=0;$i<30;$i++){
            App\Answer::create([
                'text' => $faker->word,
            ]);
        }
    }
}
