<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Course extends Model
{
    protected $fillable = [ 'title', 'slug', 'description', 'duration', 'start_date', 'end_date'];
    protected $hidden = [];
    public static $searchable = [
        'title',
        'slug',
        'description',
    ];

    public function lessons()
    {
        return $this->belongsToMany(Lesson::class, 'course_lesson')->withTrashed();
    }

    public static function userCourse($user){
        $courses = DB::table('data_courses')
        ->leftJoin('courses','data_courses.course_id','=','courses.id')
        ->where('data_courses.user_id','=',$user)
        ->get();
        return $courses;
    }
}
