<?php

namespace App\Http\Controllers\Api;

Use App\DataCourse;
Use App\User;
Use App\Course;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class DataCourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($user)
    {
        $mycourses = Course::userCourse($user);
        if($mycourses != null){
        return response()->json($mycourses,200);
        //200: OK. The standard success code and default option.
        }else{
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($user,$course)
    {
        $course = Course::findOrFail($course);
        $mycourse = Course::userCourse($user)
        ->where('course_id','=',$course->id);

        return response()->json($mycourse);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($user,$course)
    {
        try{
            $user = User::findOrFail($user);
            $course = Course::findOrFail($course);
            DB::table('data_courses')->insert([
                'user_id' => $user->id,
                'course_id' => $course->id,
            ]);
            DataCourse::createDataLesson($user,$course);
        }catch(ModelNotFoundException $e){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
        return response()->json(201);
        //201: Object created. Useful for the store actions.
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$user,$course)
    {
        try{
            $course = Course::findOrFail($course);
            DB::table('data_courses')
            ->where('data_courses.user_id','=',$user)
            ->where('data_courses.course_id','=',$course->id)
            ->update($request->all());
        }catch(ModelNotFoundException $e){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
        return response()->json(204);
        //204: No content. When an action was executed successfully, but there is no content to return.
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return response()->json(405);
    }
}
