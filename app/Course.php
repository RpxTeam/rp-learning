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
    protected $fillable = [ 'title', 'slug','introduction', 'description', 'duration', 'image', 'mime','instructor', 'start_date', 'end_date', 'quiz', 'template_id', 'status','user_id'];
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
        ->where('user_id','=',$user)
        ->get();
        
        $data = collect();

        foreach($courses as $course){
            $c = DB::table('courses')->where('id',$course->course_id)->first();
            if($c){
                $course->title = $c->title;
                $course->slug = $c->slug;
                $course->introduction = $c->introduction;
                $course->description = $c->description;
                $course->duration = $c->duration;
                $course->image = $c->image;
                $course->mime = $c->mime;
                $course->instructor = $c->instructor;
                $course->start_date = $c->start_date;
                $course->end_date = $c->end_date;
                $course->quiz = $c->quiz;
                // $course->template_id = $c->template_id;
                // $course->status = $c->status;

                if($course->image != null){
                    $course->image = Storage::url($course->image);
                }
                $course->total_lesson = DB::table('course_lesson')->where('course_id',$course->course_id)->count();
                $course->lesson_complete = DB::table('data_lessons')
                ->where('user_id',$user)
                ->where('course_id',$course->course_id)
                ->whereNotNull('finish')
                ->count();

                $data->push($course);
            }
        }
        return $data;
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
        if(Storage::exists($course->image)){
            Storage::delete($course->image);
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
