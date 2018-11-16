<?php

namespace App\Http\Controllers\Api;

Use App\User;
Use App\Course;
Use App\Lesson;
use App\DataLesson;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class DataLessonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($user,$course)
    {
        $lessons = Lesson::userLessons($user,$course);

        return response()->json($lessons);
    }
    
    /**
     * Display the specified resource.
     *
     * @param  \App\DataLesson  $dataLesson
     * @return \Illuminate\Http\Response
     */
    public function show($user,$course,$lesson)
    {
        $lessons = Lesson::userLessons($user,$course)
        ->where('lesson_id','=',$lesson);
        
        return response()->json($lessons);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($user,$course,$lesson)
    {
        try{
            $course = Course::findOrFail($course);
            $lesson = Lesson::findOrFail($lesson);
            DB::table('data_lessons')->insert([
                'user_id' => $user,
                'course_id' => $course->id,
                'lesson_id' => $lesson->id,
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
     * @param  \App\DataLesson  $dataLesson
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$user,$course,$lesson)
    {
        try{
            $course = Course::findOrFail($course);
            $lesson = Course::findOrFail($lesson);
            DB::table('data_lessons')
            ->where('data_lessons.user_id','=',$user)
            ->where('data_lessons.course_id','=',$course->id)
            ->where('data_lessons.lesson_id','=',$lesson->id)
            ->update([
                'view' => $request->view,
                'progress' => $request->progress,
                'finish' => $request->finish,                
            ]);
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
     * @param  \App\DataLesson  $dataLesson
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return response()->json(405);
    }
}
