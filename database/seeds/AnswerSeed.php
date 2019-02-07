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

        $items = [
            ['id' => 1, 'text' => 'sprites' , 'correct'=> 1],
            ['id' => 2, 'text' => 'simply textured polygonal objects', 'correct'=> 0],
            ['id' => 3, 'text' => 'full polygon', 'correct'=> 0],
            ['id' => 4, 'text' => 'fully texture-mapped', 'correct'=> 0],
            ['id' => 5, 'text' => '3D Polygon', 'correct'=> 0],
        ];
        foreach($items as $item)
        App\Answer::create($item);

        // for($i=0;$i<15;$i++){
        //     App\Answer::create([
        //         'text' => $faker->word,
        //     ]);
        // }
    }
}
