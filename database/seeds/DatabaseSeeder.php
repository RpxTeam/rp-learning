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
        $this->call(RoleSeed::class);
        $this->call(UserSeed::class);
        $this->call(CourseSeed::class);
        $this->call(LessonSeed::class);
        $this->call(PointSeed::class);
        $this->call(LevelSeed::class);
        $this->call(AnswerSeed::class);
        $this->call(QuizSeed::class);
        $this->call(QuestionSeed::class);
        
        //relation seeds
        $this->call(CourseLessonSeed::class);
        $this->call(CourseQuizSeed::class);
        $this->call(QuizQuestionSeed::class);
        $this->call(QuestionAnswerSeed::class);
        //$this->call(DataCourseSeed::class);
        //$this->call(DataLessonSeed::class);
    }
}
