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
}
