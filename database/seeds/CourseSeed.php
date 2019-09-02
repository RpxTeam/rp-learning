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
       
        // $items = [
            // ['title' => "How To Make a FPS game",
            //  'slug' => "how-to-make-a-fps-game",
            //  'introduction' => 'Making a FPS Game.',
            //  'description' => 'Learn how to make a first person shooter in no-time using the Unity game engine and the FPS Control plugin.',
            //  'duration' => 8,
            //  'instructor' =>  'Sergio Fukuhara',
            //  'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
            //  'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            //  'image' => 'exemple/course/course-1.jpg',
            //  'mime'=> 'image/jpeg',
            //  'created_at' => now(),
            //  'updated_at' => now(),
            //  'template_id' => 1
            // ],
            // ['title' => "Como fazer um Fliperama com Raspberry Pi",
            //  'slug' => "como-fazer-um-fliperama-com-raspberry-pi",
            //  'introduction' => 'Criando um Fliperama com Raspberry Pi',
            //  'description' => 'Que tal voltar no tempo e jogar no Raspberry Pi aqueles jogos clássicos dos anos 80 e 90, como Pac Man, River Raid e Donkey Kong, entre outros títulos de videogames como Super Nintendo, Atari e MSX? Nesse post você terá todos os passos para montar sua própria Máquina de Fliperama com Raspberry Pi, com detalhes sobre o sistema operacional utilizado, conexões do hardware, controles, etc.',
            //  'duration' => 10,
            //  'instructor' =>  'Sergio Fukuhara',
            //  'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
            //  'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            //  'image' => 'exemple/course/course-2.jpeg',
            //  'mime'=> 'image/jpeg',
            //  'created_at' => now(),
            //  'updated_at' => now(),
            // ],
            // ['title' => "Curso de Egograma",
            //  'slug' => "curso-de-egograma",
            //  'introduction' => 'Com egograma você identifica o caminho para reconhecer e readequar comportamentos.',
            //  'description' => 'Com egograma você identifica o caminho para reconhecer e readequar comportamentos. Desde o nascimento até a primeira infância, a criança é totalmente livre e faz o que bem quer. Ao iniciar a educação, os pais, em geral, mantêm uma educação baseada em restrições, e isso influencia diretamente no comportamento quando se tornar uma pessoa adulta.',
            //  'duration' => 9,
            //  'instructor' =>  'Sergio Fukuhara',
            //  'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
            //  'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            //  'image' => 'exemple/course/course-3.jpeg',
            //  'mime'=> 'image/jpeg',
            //  'created_at' => now(),
            //  'updated_at' => now(),
            // ],
            // ['title' => "Curso 04",
            //  'slug' => "curso4",
            //  'introduction' => $faker->realText($maxNbChars = 200, $indexSize = 2),
            //  'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
            //  'duration' => $faker->randomDigitNotNull,
            //  'instructor' =>  $faker->name,
            //  'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
            //  'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            //  'created_at' => now(),
            //  'updated_at' => now(),
            // ],
            // ['title' => "Curso 05",
            //  'slug' => "curso5",
            //  'introduction' => $faker->realText($maxNbChars = 200, $indexSize = 2),
            //  'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
            //  'duration' => $faker->randomDigitNotNull,
            //  'instructor' =>  $faker->name,
            //  'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
            //  'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            //  'created_at' => now(),
            //  'updated_at' => now(),
            // ],
            // ['title' => "Curso 06",
            //  'slug' => "curso6",
            //  'introduction' => $faker->realText($maxNbChars = 200, $indexSize = 2),
            //  'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
            //  'duration' => $faker->randomDigitNotNull,
            //  'instructor' =>  $faker->name,
            //  'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
            //  'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            //  'created_at' => now(),
            //  'updated_at' => now(),
            // ],
            // ['title' => "Curso 07",
            //  'slug' => "curso7",
            //  'introduction' => $faker->realText($maxNbChars = 200, $indexSize = 2),
            //  'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
            //  'duration' => $faker->randomDigitNotNull,
            //  'instructor' =>  $faker->name,
            //  'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
            //  'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            //  'created_at' => now(),
            //  'updated_at' => now(),
            // ],
            // ['title' => "Curso 08",
            //  'slug' => "curso8",
            //  'introduction' => $faker->realText($maxNbChars = 200, $indexSize = 2),
            //  'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
            //  'duration' => $faker->randomDigitNotNull,
            //  'instructor' =>  $faker->name,
            //  'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
            //  'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            //  'created_at' => now(),
            //  'updated_at' => now(),
            // ],
            // ['title' => "Curso 09",
            //  'slug' => "curso9",
            //  'introduction' => $faker->realText($maxNbChars = 200, $indexSize = 2),
            //  'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
            //  'duration' => $faker->randomDigitNotNull,
            //  'instructor' =>  $faker->name,
            //  'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
            //  'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            //  'created_at' => now(),
            //  'updated_at' => now(),
            // ],
            // ['title' => "Curso 10",
            //  'slug' => "curso10",
            //  'introduction' => $faker->realText($maxNbChars = 200, $indexSize = 2),
            //  'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
            //  'duration' => $faker->randomDigitNotNull,
            //  'instructor' =>  $faker->name,
            //  'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
            //  'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
            //  'created_at' => now(),
            //  'updated_at' => now(),
            // ],
            
        // ];

        // foreach ($items as $item) {
        //     \App\Course::create($item);
        // }



        for($i=0;$i<10;$i++){
            \App\Course::create([
                'title' => $faker->word,
                'slug' => $faker->word,
                'introduction' => $faker->realText($maxNbChars = 200, $indexSize = 2),
                'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
                'duration' => $faker->randomDigitNotNull,
                'instructor' =>  $faker->name,
                'start_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 days', 'now')->getTimestamp())->format('Y/m/d'),
                'end_date' => Carbon::createFromTimeStamp($faker->dateTimeBetween('now', '+90 days')->getTimestamp())->format('Y/m/d'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
