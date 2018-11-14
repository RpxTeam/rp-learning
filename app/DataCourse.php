<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
}
