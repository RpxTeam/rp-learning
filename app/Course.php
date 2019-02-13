<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use App\Author;

class Course extends Model
{
    protected $fillable = [ 'title', 'slug','introduction', 'description', 'duration', 'image', 'mime','instructor', 'start_date', 'end_date', 'quiz', 'template_id'];
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
        
        foreach($courses as $course){
            if($course->image != null){
                $course->image = Storage::url($course->image);
            }
            $course->total_lesson = DB::table('course_lesson')->where('course_id',$course->id)->count();
            $course->lesson_complete = DB::table('data_lessons')
                                        ->where('user_id',$user)
                                        ->where('course_id',$course->id)
                                        ->whereNotNull('finish')
                                        ->count();
        }
        return $courses;
    }

    public static function uploadImageCourse(Request $request, Course $course){
        $filename = $course->id . '-' . str_slug($course->title) . '.' . $request->file('image')->getClientOriginalExtension();
        $request->file('image')->storeAs('courses/images', $filename);
        $course->image = 'courses/images/' . $filename;
        $course->mime = $request->file('image')->getClientMimeType();
        $course->save();
    }

    public static function updateImageCourse(Request $request, Course $course){
        $filename = $course->id . '-' . str_slug($course->title) . '.' . $request->file('image')->getClientOriginalExtension();
        $filepath = 'courses/images/' . $filename;
        if(Storage::exists($filepath)){
            Storage::delete($filepath);
        }
        $request->file('image')->storeAs('courses/images', $filename);
        $course->image =  $filepath;
        $course->mime = $request->file('image')->getClientMimeType();
        $course->save();
    }

    public static function getFavoriteCount(Int $id){
        $fav = DB::table('data_courses')
                 ->where('course_id','=',$id)
                 ->where('favorite','=',1)
                 ->count();
        return $fav;
    }

    public static function getViewCount(Int $id){
        $view = DB::table('data_courses')
                 ->where('course_id','=',$id)
                 ->where('view','=',1)
                 ->count();
        return $view;
    }

    /**
     * Set to null if empty
     * @param $input
     */
    public function setAuthorIdAttribute($input)
    {
        $this->attributes['author_id'] = $input ? $input : null;
    }

    public function author()
    {
        return $this->belongsTo(Author::class, 'author_id')->withTrashed();
    }
}
