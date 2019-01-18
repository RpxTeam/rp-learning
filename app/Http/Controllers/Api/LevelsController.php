<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Level;

class LevelsController extends Controller
{
    public function makeLevels(Request $request){
        if($request->has('points') && $request->points != null){            
            $startPoints = $request->points;
        }else{
            return response()->json(400);
        }

        if($request->has('levels') && $request->level != null){
            $maxLevel = $request->level;
        }else{
            return response()->json(400);
        }

        if($request->has('levelup')){
            $levelUp = $request->levelUp;
        }else{
            $levelUp = DB::table('points')->where('name','levels')->first();            
        }

        Level::setLevel($startPoints,$maxLevel,$levelUp);

        return response()->json(204);
    }
}
