<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Course;
use App\User;
use Illuminate\Support\Facades\DB;

class DataCourse extends Model
{
    protected $fillable = ['view', 'progress', 'finish', 'rating', 'testimonal', 'favorite', 'user_id', 'course_id'];
    protected $hidden = [];
    public static $searchable = [
    ];

    /**
     * Set to null if empty
     * @param $input
     */
    public function setUserIdAttribute($input)
    {
        $this->attributes['user_id'] = $input ? $input : null;
    }
    /**
     * Set to null if empty
     * @param $input
     */
    public function setCourseIdAttribute($input)
    {
        $this->attributes['course_id'] = $input ? $input : null;
    }


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id')->withTrashed();
    }

    public static function createDataLesson(User $user, Course $course){
        $lessons = DB::table('course_lesson')
        ->where('course_lesson.course_id','=',$course->id)
        ->get();
        foreach($lessons as $lesson){
            DataCouse::updateDataLesson($user->id, $course->id, $lesson->id);
        }
    }

    public static function updateDataLesson($user,$course,$lesson){
        DataLesson::updateOrCreate([
            'user_id' => $user,
            'course_id' => $course,
            'lesson_id' => $lesson,
        ],[
            'updated_at' => now(),
        ]);
    }

    public static function verifyDataLesson($user, $course){
        $lessons = DB::table('course_lesson')->where('course_id',$course)->get();
        $total = DB::table('data_lessons')->where('user_id',$user)->where('course_id',$course)->count();

        if($lessons->count() != $total){
            foreach($lessons as $lesson){
                $l = DB::table('data_lessons')
                ->where('user_id',$user)
                ->where('course_id',$course)
                ->where('lesson_id',$lesson->lesson_id)
                ->first();
                
                if(!$l){
                    DataCourse::updateDataLesson($user,$course,$lesson->lesson_id);
                }
            }
        }
    }
}
