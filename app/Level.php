<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\User;

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
        
        $levelMin = DB::table('levels')
                    ->where('level', 1)
                    ->first();

        if($total < $levelMin->point){
            User::whereId($user)->update(['level' => 0]);
        }else{
            $level = DB::table('levels')
            ->where('total_point','<=', $total)
            ->orderBy('level','desc')
            ->first();
            User::whereId($user)->update(['level' => $level->level]);
        }
    }

    public static function setLevel($startPoints,$maxLevel,$levelUp){
        // $startPoints = 100;
        // $maxLevel = 10;
        // $levelUp = DB::table('points')->where('name','levels')->first();

        $points = $startPoints;
        $totalPoints = 0;

        for($i=1;$i<=$maxLevel;$i++){
            $totalPoints += $points;
            DB::table('levels')->insert([
                'level' => $i,
                'point' => $points,
                'total_point' => $totalPoints,
            ]);
            $points = $points * $levelUp->point;
        }
    }
}
