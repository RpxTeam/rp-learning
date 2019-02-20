<?php

namespace App\Http\Controllers\Api;

use App\Trail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TrailController extends Controller
{
    /**
     * Display all trails
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $trails = Trail::All()->each(function($trail){
            $trail = Trail::trailCourses($trail);
            //not complete
        });
    }

    /**
     * Display specific trail.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Store new trail.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Update specific trail.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Delete speficic trail
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
