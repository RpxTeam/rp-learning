<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\DataPoint;
use App\User;
use App\Course;
use App\Lesson;
use App\Quiz;
use App\Level;

class DataPointController extends Controller
{
    public function course($user, $course){
        $user = User::findOrFail($user);
        $course = Course::findOrFail($course);

        DataPoint::coursePoints($user->id, $course->id);

        Level::userLevel($user->id);

        return response()->json(204);
    }

    public function lesson($user, $course, $lesson){
        $user = User::findOrFail($user);
        $course = Course::findOrFail($course);
        $lesson = Lesson::findOrFail($lesson);

        DataPoint::lessonPoints($user->id, $course->id, $lesson->id);

        Level::userLevel($user->id);

        return response()->json(204);
    }

    public function quiz($user, $course, $quiz){
        $user = User::findOrFail($user);
        $course = Course::findOrFail($course);
        $quiz = Quiz::findOrFail($quiz);

        DataPoint::quizPoints($user->id, $course->id, $quiz->id);

        Level::userLevel($user->id);

        return response()->json(204);
    }

    public function user($user){
        $user = User::findOrFail($user);

        $total = DB::table('data_points')
                    ->leftjoin('points', 'data_points.point_id','=','points.id')
                    ->where('user_id',$user->id)
                    ->sum('point');

        $count = DB::table('data_points')
                    ->where('user_id', $user->id)
                    ->count();
        
        return response()->json(['count' => $count,'total' => $total], 200);
    }

    public function final($user, $course, $quiz){
        $user = User::findOrFail($user);
        $course = Course::findOrFail($course);
        $quiz = Quiz::findOrFail($quiz);

        $final = DB::table('data_points')
                    ->where('user_id', $user->id)
                    ->where('course_id', $course->id)
                    ->where('quiz_id', $quiz->id)
                    ->first();
        
        if(empty($final)){
            return response()->json(400);
        }else{
            return response()->json(200);
        }
    }

}
