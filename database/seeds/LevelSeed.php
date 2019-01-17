<?php

use Illuminate\Database\Seeder;

class LevelSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [
            ['id' => 1, 'level' => 1, 'point' => 100, 'total_point' => 100],
            ['id' => 2, 'level' => 2, 'point' => 100, 'total_point' => 200],
            ['id' => 3, 'level' => 3, 'point' => 100, 'total_point' => 300],
            ['id' => 4, 'level' => 4, 'point' => 100, 'total_point' => 400],
            ['id' => 5, 'level' => 5, 'point' => 100, 'total_point' => 500],
            ['id' => 6, 'level' => 6, 'point' => 100, 'total_point' => 600],
            ['id' => 7, 'level' => 7, 'point' => 100, 'total_point' => 700],
            ['id' => 8, 'level' => 8, 'point' => 100, 'total_point' => 800],
            ['id' => 9, 'level' => 9, 'point' => 100, 'total_point' => 900],
            ['id' => 10, 'level' => 10, 'point' => 100, 'total_point' => 1000],
        ];

        foreach ($items as $item) {
            \App\Level::create($item);
        }
    }
}
