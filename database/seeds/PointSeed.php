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
            ['id' => 1, 'name' => 'course', 'point' => 100],
            ['id' => 2, 'name' => 'lesson', 'point' => 100],
            ['id' => 3, 'name' => 'quiz', 'point' => 100],
        ];

        foreach ($items as $item) {
            \App\Point::create($item);
        }
    }
}
