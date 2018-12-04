<?php

namespace App\Http\Controllers\Api;

use App\Lesson;
use App\Course;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($course)
    {
        $course = Course::findOrFail($course);
        $lessons = Lesson::courseLessons($course)->each(function($lesson){
            if($lesson->content != null && $lesson->mime != null){
                $lesson->content = Storage::url($lesson->content);
            }
        });

        return response()->json($lessons,200);
        // return response()->json(array('course'=>$course,'lessons'=>$lessons),200);
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
        $course = Course::findOrFail($course);
        $lesson = Lesson::courseLessons($course)
        ->where('lesson_id','=',$lesson)->first();
        if($lesson == null){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }else{
            if($lesson->content != null && $lesson->mime != null){
                $lesson->content = Storage::url($lesson->content);
            }
            return response()->json($lesson,200);
            // return response()->json(array('course'=>$course,'lesson'=>$lesson),200);
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
            if($request->hasFile('content') && $request->file('content')->isValid()) {
                $lesson = Lesson::create($request->except('content'));
                Lesson::uploadFileLesson($request , $lesson);
            }else{
                $lesson = Lesson::create($request->except('content'));
            }
            $course = Course::findOrFail($course);
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
            if($request->hasFile('content') && $request->file('content')->isValid()) {
                $lesson = Lesson::findOrFail($lesson);
                Lesson::whereId($lesson->id)->update($request->except(['_method','content']));
                Lesson::updateFileLesson($request,$lesson);
            }else{
                $lesson = Lesson::findOrFail($lesson);
                Lesson::whereId($lesson->id)->update($request->except(['_method','content']));
            }
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
            if(Storage::exists($lesson->content)){
                Storage::delete($lesson->content);
            }
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
