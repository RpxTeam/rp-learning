<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DataCourse extends Model
{
    protected $fillable = ['view', 'progress', 'finish', 'rating', 'testimonal', 'favorite', 'user_id', 'course_id'];
    protected $hidden = [];
    public static $searchable = [
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id')->withTrashed();
    }
}
