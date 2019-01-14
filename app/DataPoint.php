<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Point;
use App\User;
use App\Course;

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
        $user = User::findOrFail($user);
        $course = Course::findOrFail($course);
        $point = Point::where('name','course')->first();

        $a = DataPoint::updateOrCreate([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'point_id' => $point->id,
        ],[
            'updated_at' => now(),
        ]);

        return $a;
    }
}
