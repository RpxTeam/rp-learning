<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Dashboard;
use App\User;
use App\Course;
use App\DataCourse;
use Illuminate\Support\Facades\DB;
use App\Point;

class DashboardController extends Controller
{
    public function admin(){
        $leaderboard = Dashboard::leaderboard();
        $courses = Dashboard::latestCourses(5);
        $users = Dashboard::latestUsers(5);
        $totalCourses = Course::count();
        $totalUsers = User::count();

        return response()->json([
            'leaderboard'=> $leaderboard,
            'courses' => $courses,
            'users' => $users,
            'totalCourses' => $totalCourses,
            'totalUsers' => $totalUsers
        ], 200);
    }

    public function instructor($id){
        $user = User::findOrFail($id);
        $courses = Dashboard::instructorCourses($user->id);

        $started = 0;
        $onGoing = 0;
        $finished = 0;
        foreach($courses as $course){
            $course->setAttribute('started',DataCourse::started($course->id));
            $course->setAttribute('onGoing',DataCourse::onGoing($course->id));
            $course->setAttribute('finished',DataCourse::finished($course->id));
            
            $started += $course->started;
            $onGoing += $course->onGoing;
            $finished += $course->finished;
        }
        // lista de usuarios*

        return response()->json([
            'courses' => $courses,
            'started' => $started,
            'onGoing' => $onGoing,
            'finished' => $finished,
        ], 200);

    }

    public function student($id){
        $user = User::findOrFail($id);

        $courses = DB::table('data_courses')
                    ->leftJoin('courses','data_courses.course_id','=','courses.id')
                    ->where('user_id', $user-id)
                    ->get();

        $certifications= DB::table('certifications')
                            ->where('user_id', $user->id)
                            ->get();

        $points = Point::total($user->id);

        return response()->json([
            'courses' => $courses,
            'certifications' => $certifications,
            'points' => $points,
        ], 200);
    }
}
