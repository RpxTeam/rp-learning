<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class CourseSeed extends Seeder
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
            ['title' => "How To Make a FPS game",
             'slug' => "how-to-make-a-fps-game",
             'introduction' => 'Making a FPS Game.',
             'description' => 'Learn how to make a first person shooter in no-time using the Unity game engine and the FPS Control plugin.',
             'duration' => 8,
             'instructor' =>  'Sergio Fukuhara',
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
             'image' => 'exemple/course/course-1.jpeg',
             'mime'=> 'image/jpeg',
             'created_at' => now(),
             'updated_at' => now(),
            ],
            ['title' => "Curso 02",
             'slug' => "curso2",
             'introduction' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'duration' => $faker->randomDigitNotNull,
             'instructor' =>  $faker->name,
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
             'created_at' => now(),
             'updated_at' => now(),
            ],
            ['title' => "Curso 03",
             'slug' => "curso3",
             'introduction' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'duration' => $faker->randomDigitNotNull,
             'instructor' =>  $faker->name,
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
             'created_at' => now(),
             'updated_at' => now(),
            ],
            ['title' => "Curso 04",
             'slug' => "curso4",
             'introduction' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'duration' => $faker->randomDigitNotNull,
             'instructor' =>  $faker->name,
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
             'created_at' => now(),
             'updated_at' => now(),
            ],
            ['title' => "Curso 05",
             'slug' => "curso5",
             'introduction' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'duration' => $faker->randomDigitNotNull,
             'instructor' =>  $faker->name,
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
             'created_at' => now(),
             'updated_at' => now(),
            ],
            ['title' => "Curso 06",
             'slug' => "curso6",
             'introduction' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'duration' => $faker->randomDigitNotNull,
             'instructor' =>  $faker->name,
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
             'created_at' => now(),
             'updated_at' => now(),
            ],
            ['title' => "Curso 07",
             'slug' => "curso7",
             'introduction' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'duration' => $faker->randomDigitNotNull,
             'instructor' =>  $faker->name,
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
             'created_at' => now(),
             'updated_at' => now(),
            ],
            ['title' => "Curso 08",
             'slug' => "curso8",
             'introduction' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'duration' => $faker->randomDigitNotNull,
             'instructor' =>  $faker->name,
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
             'created_at' => now(),
             'updated_at' => now(),
            ],
            ['title' => "Curso 09",
             'slug' => "curso9",
             'introduction' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'duration' => $faker->randomDigitNotNull,
             'instructor' =>  $faker->name,
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
             'created_at' => now(),
             'updated_at' => now(),
            ],
            ['title' => "Curso 10",
             'slug' => "curso10",
             'introduction' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'duration' => $faker->randomDigitNotNull,
             'instructor' =>  $faker->name,
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
             'created_at' => now(),
             'updated_at' => now(),
            ],
            
        ];

        foreach ($items as $item) {
            \App\Course::create($item);
        }



        // for($i=0;$i<5;$i++){
        //     \App\Course::create([
        //         'title' => $faker->word,
        //         'slug' => $faker->word,
        //         'introduction' => $faker->realText($maxNbChars = 200, $indexSize = 2),
        //         'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
        //         'duration' => $faker->randomDigitNotNull,
        //         'instructor' =>  $faker->name,
        //         'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
        //         'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ]);
        // }
    }
}
