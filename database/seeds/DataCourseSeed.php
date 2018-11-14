<?php

use Illuminate\Database\Seeder;

class DataCourseSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        for($i=0;$i<20;$i++){
            \App\DataCourse::insert([
                'view' => $faker->numberBetween(0,1),
                'progress' => $faker->numberBetween(0,100),
                'finish'=> $faker->numberBetween(0,1),
                'rating' => $faker->numberBetween(1,5),
                'testimonal' => $faker->word,
                'favorite'=> $faker->numberBetween(0,1),
                'user_id' => $faker->randomDigitNotNull,
                'course_id' => $faker->randomDigitNotNull,

            ]);
        }
    }
}
