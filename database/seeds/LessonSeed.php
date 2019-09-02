<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

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

        // $examples = [
        //     ['order' => 1,
        //      'title' => 'What is a FPS Engine?',
        //      'description' => '',
        //      'type' => 'text',
        //      'content' => '<p>A first-person shooter engine is a video game engine specialized for simulating 3D environments for use in a first-person shooter video game. First-person refers to the view where the players see the world from the eyes of their characters. Shooter refers to games which revolve primarily around wielding firearms and killing other entities in the game world, either non-player characters or other players.</p><p>The development of the FPS graphic engines is characterized by a steady increase in technologies, with some breakthroughs. Attempts at defining distinct generations lead to arbitrary choices of what constitutes a highly modified version of an old engine and what is a new engine.</p><p>The classification is complicated as game engines blend old and new technologies. Features considered advanced in a new game one year, become the expected standard the next year. Games with a combination of both older and newer features are the norm. For example, Jurassic Park: Trespasser (1998) introduced physics to the FPS genre, which did not become common until around 2002. Red Faction (2001) featured a destructible environment, something still not common in engines years later.</p><img src="'.Storage::url('exemple/lesson/lesson-1.jpg').'"/>',
        //      'mime' => 'image/jpg',
        //     ],
        //     ['order' => 2,
        //      'title' => 'video',
        //      'type' => 'video-internal',
        //      'content' => 'exemple/lesson/lesson-2.mp4',
        //      'mime' => 'video/mp4',
        //     ],
        //     ['order' => 3,
        //      'title' => '1970s and 1980s: Early FPS graphics engines',
        //      'description' => '',
        //      'type' => 'text',
        //      'content' => '<p>Game rendering for this early generation of FPS were already from the first-person perspective and with the need to shoot things, however they were mostly made up using Vector graphics.</p><p>There are two possible claimants for the first FPS, Maze War and Spasim. Maze War was developed in 1973 and involved a single player making his way through a maze of corridors rendered using a fixed perspective. Multiplayer capabilities, where players attempted to shoot each other, were added later and were networked in 1974. </p><img src="'.Storage::url('exemple/lesson/lesson-3.jpg').'"/><p>Spasim was originally developed in 1974 and involved players moving through a wire-frame 3D universe. Spasim could be played by up to 32 players on the PLATO network.</p><p>Developed in-house by Incentive Software, the Freescape engine is considered to be one of the first proprietary 3D engines to be used for computer games, although the engine was not used commercially outside of Incentives own titles. The first game to use this engine was the puzzle game Driller in 1987.</p>',
        //      'mime' => 'image/jpg',
        //     ],
        //     ['order' => 4,
        //      'title' => 'Early 1990s: Wireframes to 2.5D worlds and textures ',
        //      'type' => 'pdf',
        //      'content' => 'exemple/lesson/lesson-4.pdf',
        //      'mime' => 'application/pdf',
        //     ],
        //     ['order' => 5,
        //      'title' => 'Mid 1990s: 3D models, beginnings of hardware acceleration',
        //      'type' => 'audio',
        //      'content' => 'exemple/lesson/lesson-5.mp3',
        //      'mime' => 'audio/mpeg',
        //     ],
        //     ['order' => 6,
        //      'title' => 'Late 1990s: Full 32-bit color, and GPUs become standard',
        //      'type' => 'video-external',
        //      'content' => 'https://www.youtube.com/embed/a7ntf6wiIik',
        //     ],

        // ];

        // foreach ($examples as $example) {
        //     \App\Lesson::create($example);
        // }

        
        for($i=0;$i<20;$i++){
            \App\Lesson::create([
                'order' => $i+1,
                'title' => $faker->word,
                'description' => $faker->paragraph($nbSentences = 3, $variableNbSentences = true),
                'content' => $faker->paragraph($nbSentences = 5, $variableNbSentences = true),
            ]);
        }
    }
}
