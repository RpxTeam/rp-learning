<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use App\Course;
use App\Lesson;
use App\Quiz;

class Point extends Model
{
    protected $fillable = ['name', 'point'];
    protected $hidden = [];
    public static $searchable = [
    ];

    public static function total($user){
        $points = DB::table('data_points')
                ->where('user_id',$user)
                ->get();

        $total = 0;

        foreach($points as $point){
            $p = DB::table('points')->where('id', $point->point_id)->first();

            $total += $p->point;
        }

        return $total;
    }

    public static function details($user){
        $points = DB::table('data_points')
                ->where('user_id',$user)
                ->get();
        $data = new collection();

        $data->put('total',Point::total($user));

        foreach($points as $point){
            $p = new Collection();

            $p->push(Course::find($point->course_id));

            if($point->lesson_id){
                $p->push(Lesson::find($point->lesson_id));
            }

            if($point->quiz_id){
                $p->push(Quiz::find($point->quiz_id));
            }

            $data->push($p);
        }

        return $data;
    }
}
