<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Course;

class Trail extends Model
{
    protected $fillable = ['title','description','image','mime'];
    protected $hidden = [];
    public static $searchable = [
    ];

    public static function trailCourses(Trail $trail){
        $courses = DB::table('trail_courses')->where('trail_id', $trail->id)->get();

        foreach($courses as $course){
            $course = Course::findOrFail($course->course_id);
        }

        $trail->setAttribute('courses', $courses);

        return $trail;
    }
}
