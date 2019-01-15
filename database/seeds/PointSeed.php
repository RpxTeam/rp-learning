<?php

use Illuminate\Database\Seeder;

class PointSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [
            ['id' => 1, 'name' => 'courses', 'point' => 100],
            ['id' => 2, 'name' => 'lessons', 'point' => 100],
            ['id' => 3, 'name' => 'quiz', 'point' => 100],
            ['id' => 4, 'name' => 'levels', 'point' => 1.1],

        ];

        foreach ($items as $item) {
            \App\Point::create($item);
        }
    }
}
