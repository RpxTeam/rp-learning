<?php

use Illuminate\Database\Seeder;

class LessonSeed extends Seeder
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
            \App\Lesson::create([
                'order' => $i+1,
                'title' => $faker->word,
                'description' => $faker->paragraph($nbSentences = 3, $variableNbSentences = true),
                'content' => $faker->paragraph($nbSentences = 5, $variableNbSentences = true),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
