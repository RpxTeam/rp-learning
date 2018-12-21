<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

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
            \App\DataCourse::create([
                'view' => $faker->numberBetween(0,1),
                'progress' => $faker->numberBetween(0,100),
                'finish'=> Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
                'rating' => $faker->numberBetween(1,5),
                'testimonal' => $faker->word,
                'favorite'=> $faker->numberBetween(0,1),
                'user_id' => $faker->randomDigitNotNull,
                'course_id' => $faker->randomDigitNotNull,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
