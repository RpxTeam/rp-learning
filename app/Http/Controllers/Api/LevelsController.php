<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Level;

class LevelsController extends Controller
{
    /**
     * Create Levels with each points required
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function makeLevels(Request $request){
        
        if($request->has('points') && $request->points != null){
            $startPoints = $request->points;
        }else{
            return response()->json(400);
        }
        
        if($request->has('levels') && $request->levels != null){
            $maxLevel = $request->levels;
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
