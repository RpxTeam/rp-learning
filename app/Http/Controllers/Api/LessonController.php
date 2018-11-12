<?php

namespace App\Http\Controllers\Api;

use App\Lesson;
use App\Course;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($course)
    {
        $lessons = DB::table('course_lesson')
        ->leftJoin('lessons','course_lesson.lesson_id','=','lessons.id')
        ->where('course_lesson.course_id','=',$course)
        ->get();

        return response()->json($lessons,200);
        //200: OK. The standard success code and default option.
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($course,$lesson)
    {
        $lessons = DB::table('course_lesson')
        ->leftJoin('lessons','course_lesson.lesson_id','=','lessons.id')
        ->where('course_lesson.course_id','=',$course)
        ->where('course_lesson.lesson_id','=',$lesson)
        ->get();

        if($lessons->isEmpty()){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }else{
            return response()->json($lessons,200);
        //200: OK. The standard success code and default option.
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,$course)
    {
        try{
            $course = Course::findOrFail($course);
            $lesson = Lesson::create($request->all());
            DB::table('course_lesson')->insert([
                'course_id' =>$course->id,
                'lesson_id' =>$lesson->id,
            ]);

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
    public function update(Request $request, $course, $lesson)
    {
        try{
            $course = Course::findOrFail($course);
            $lesson = Lesson::findOrFail($lesson);
            $lesson->update($request->all());
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
    public function destroy($course, $lesson)
    {
        try{
            $course = Course::findOrFail($course);
            $lesson = Lesson::findOrFail($lesson);
            $lesson->delete();
            DB::table('course_lesson')
            ->where('course_id','=', $course->id)
            ->where('lesson_id','=', $lesson->id)
            ->delete();
            
        }catch(ModelNotFoundException $e){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
        return response()->json(204);
        //204: No content. When an action was executed successfully, but there is no content to return.
    }
}
