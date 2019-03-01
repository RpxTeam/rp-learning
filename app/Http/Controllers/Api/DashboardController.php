<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Dashboard;

class DashboardController extends Controller
{
    public function index(){
        $leaderboard = Dashboard::leaderboard();
        $courses = Dashboard::latestCourses(5);

        return response()->json(['leaderboard'=> $leaderboard, 'courses' => $courses], 200);
    }
}
