<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Lesson extends Model
{
    protected $fillable = ['order', 'title', 'slug', 'description', 'content'];
    protected $hidden = [];
    public static $searchable = [
        'title',
        'slug',
        'description',
        'content',
    ];

    public static function courseLessons($course){
        $lessons = DB::table('course_lesson')
        ->leftJoin('lessons','course_lesson.lesson_id','=','lessons.id')
        ->where('course_lesson.course_id','=',$course->id)
        ->get();
        return $lessons;
    }

    public static function userLessons($user,$course){
        $lessons = DB::table('data_lessons')
        ->leftJoin('lessons','data_lessons.lesson_id','=','lessons.id')
        ->where('data_lessons.user_id','=',$user)
        ->where('data_lessons.course_id','=',$course)
        ->get();

        return $lessons;
    }
}
