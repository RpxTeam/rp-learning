<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Point;
use App\DataPoint;

class PointsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //return DataPoint::coursePoints(1,1);
        $points = Point::All();

        return response()->json($points, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($point)
    {
        $point = Point::where('id',$point)
                      ->orWhere('name',$point)
                      ->first();

        return response()->json($point, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $point = Point::create($request);

        if($point){
            return response()->json(204);
        }else{
            return response()->json(400);
        }
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $point)
    {
        $point = Point::where('id',$point)
                      ->orWhere('name',$point)
                      ->first();
                      
        if($point->isEmpty()){
            return response()->json(400);
        }

        Point::whereId($point->id)->update($request);

        return response()->json(204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($point)
    {
        $point = Point::where('id',$point)
                      ->orWhere('name',$point)
                      ->first();
                      
        if($point->isEmpty()){
            return response()->json(400);
        }

        $point->delete();

        return response()->json(204);
    }
}
