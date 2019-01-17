<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Level extends Model
{
    protected $fillable = ['level', 'point'];
    protected $hidden = [];
    public static $searchable = [
    ];

    public static function userLevel($user){
        $total = DB::table('data_points')
                    ->leftjoin('points', 'data_points.point_id','=','points.id')
                    ->where('user_id',$user)
                    ->sum('point');

        $level = DB::table('levels')
        ->where('total_point','<=', 400)
        ->get();

        dd($level);
    }
}
