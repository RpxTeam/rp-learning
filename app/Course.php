<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

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
}
