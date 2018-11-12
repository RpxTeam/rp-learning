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
            ['title' => "Curso 01",
             'slug' => "curso1",
             'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'duration' => $faker->randomDigitNotNull,
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            ],
            ['title' => "Curso 02",
             'slug' => "curso2",
             'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'duration' => $faker->randomDigitNotNull,
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            ],
            ['title' => "Curso 03",
             'slug' => "curso3",
             'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'duration' => $faker->randomDigitNotNull,
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            ],
            ['title' => "Curso 04",
             'slug' => "curso4",
             'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'duration' => $faker->randomDigitNotNull,
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            ],
            ['title' => "Curso 05",
             'slug' => "curso5",
             'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'duration' => $faker->randomDigitNotNull,
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            ],
            ['title' => "Curso 06",
             'slug' => "curso7",
             'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'duration' => $faker->randomDigitNotNull,
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            ],
            ['title' => "Curso 07",
             'slug' => "curso7",
             'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'duration' => $faker->randomDigitNotNull,
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            ],
            ['title' => "Curso 08",
             'slug' => "curso8",
             'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'duration' => $faker->randomDigitNotNull,
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            ],
            ['title' => "Curso 09",
             'slug' => "curso9",
             'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'duration' => $faker->randomDigitNotNull,
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            ],
            ['title' => "Curso 10",
             'slug' => "curso10",
             'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
             'duration' => $faker->randomDigitNotNull,
             'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
             'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            ],
            
        ];

        foreach ($items as $item) {
            \App\Course::create($item);
        }



        for($i=0;$i<5;$i++){
            \App\Course::create([                
                'title' => $faker->word,
                'slug' => $faker->word,
                'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
                'duration' => $faker->randomDigitNotNull,
                'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
                'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            ]);
        }
    }
}
