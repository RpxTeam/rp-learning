<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Point;
use App\User;
use App\Course;
use App\Lesson;
use App\Quiz;

class DataPoint extends Model
{
    protected $fillable = ['user_id','course_id','lesson_id','quiz_id','point_id'];
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

    /**
     * Set to null if empty
     * @param $input
     */
    public function setLessonIdAttribute($input)
    {
        $this->attributes['lesson_id'] = $input ? $input : null;
    }

    /**
     * Set to null if empty
     * @param $input
     */
    public function setQuizIdAttribute($input)
    {
        $this->attributes['quiz_id'] = $input ? $input : null;
    }

    /**
     * Set to null if empty
     * @param $input
     */
    public function setPointIdAttribute($input)
    {
        $this->attributes['point_id'] = $input ? $input : null;
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id')->withTrashed();
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class, 'lesson_id')->withTrashed();
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class, 'quiz_id')->withTrashed();
    }

    public function point()
    {
        return $this->belongsTo(Point::class, 'point_id')->withTrashed();
    }

    public static function coursePoints($user,$course){
        $point = Point::where('name','courses')->first();

        $data = DataPoint::updateOrCreate([
            'user_id' => $user,
            'course_id' => $course,
            'point_id' => $point->id,
        ],[
            'updated_at' => now(),
        ]);

        return $data;
    }

    public static function lessonPoints($user,$course,$lesson){
        $point = Point::where('name','lessons')->first();

        $data = DataPoint::updateOrCreate([
            'user_id' => $user,
            'course_id' => $course,
            'lesson_id' => $lesson,
            'point_id' => $point->id,
        ],[
            'updated_at' => now(),
        ]);

        return $data;
    }

    public static function quizPoints($user,$course,$quiz){
        $point = Point::where('name','quiz')->first();

        $data = DataPoint::updateOrCreate([
            'user_id' => $user,
            'course_id' => $course,
            'quiz_id' => $quiz,
            'point_id' => $point->id,
        ],[
            'updated_at' => now(),
        ]);

        return $data;
    }
}
