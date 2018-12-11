<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //base seeds
        $this->call(UserSeed::class);
        $this->call(CourseSeed::class);
        $this->call(LessonSeed::class);

        //relation seeds
        $this->call(CourseLessonSeed::class);
        //$this->call(DataCourseSeed::class);
        //$this->call(DataLessonSeed::class);
    }
}
