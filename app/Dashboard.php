<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Point;
use App\User;
use App\Course;

class Dashboard extends Model
{
    public static function leaderboard(){
        $users = User::All()->each(function($user){
            $user->setAttribute('points', Point::total($user->id));
        });

        $users = $users->sortByDesc('points');
        return $users;
    }

    public static function latestCourses($n){
        $courses = Course::orderBy('id', 'desc')->take($n)->get();

        return $courses;
    }

    public static function latestUsers($n){
        $users = User::orderBy('id', 'desc')->take($n)->get();

        return $users;
    }

    public static function instructorCourses($user){
        $courses = Course::where('user_id',$user)->orderBy('end_date')->get();
        
        return $courses;
    }

}
