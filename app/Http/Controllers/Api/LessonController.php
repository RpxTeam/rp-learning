<?php

namespace App\Http\Controllers\Api;

use App\Lesson;
use App\Course;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Helpers\VideoStream;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Response;
use Validator;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param int $course
     * @return \Illuminate\Http\Response
     */
    public function index($course)
    {
        $course = Course::where('id', $course)
                        ->orWhere('slug', $course)
                        ->firstOrFail();

        $lessons = Lesson::courseLessons($course);

        return response()->json($lessons,200);
        // return response()->json(array('course'=>$course,'lessons'=>$lessons),200);
        //200: OK. The standard success code and default option.
    }
    
    /**
     * Display the specified resource.
     *
     * @param int $course
     * @param int $lesson
     * @return \Illuminate\Http\Response
     */
    public function show($course,$lesson)
    {
        $course = Course::where('id', $course)
                        ->orWhere('slug', $course)
                        ->firstOrFail();
        $lesson = Lesson::courseLessons($course)
        ->where('lesson_id','=',$lesson)->first();
        if($lesson == null){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }else{

            return response()->json($lesson,200);
            // return response()->json(array('course'=>$course,'lesson'=>$lesson),200);
            //200: OK. The standard success code and default option.
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param int $course
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,$course)
    {
        // if($request->hasFile('content')){
        //     $validator = Validator::make($request->all(),[
        //         'order' => 'nullable|numeric',
        //         'title' => 'required|string|max:255',
        //         'description' => 'nullable|string',
        //         'type' => 'nullable|string',
        //         'content' => 'nullable|file',
        //         'mime' => 'nullable|string'
        //     ],[
        //         'title.required' => 'O campo título está vazio.',
        //     ]);
        // }else{
        //     $validator = Validator::make($request->all(),[
        //         'order' => 'nullable|numeric',
        //         'title' => 'required|string|max:255',
        //         'description' => 'nullable|string',
        //         'type' => 'nullable|string',
        //         'content' => 'nullable|string',
        //         'mime' => 'nullable|string'
        //     ],[
        //         'title.required' => 'O campo título está vazio.'
        //     ]);
        // }

        // if($validator->fails()){
        //         return response()->json($validator->errors(), 400);
        // }
        
        // if(Storage::disk('local')->put('video.mp4', $request->content)){
        //     dd('a');

        // }else{
        //     dd('b');
        // }
        
        try{
            if($request->slug == null){
                $request->slug = str_slug($request->title);
            }
            if($request->hasFile('content') && $request->file('content')->isValid()) {
                $lesson = Lesson::create($request->except('content'));
                Lesson::uploadFileLesson($request , $lesson);
            }else{
                $lesson = Lesson::create($request->All());
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
        return response()->json($lesson->id, 200);
        //201: Object created. Useful for the store actions.
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param int $course
     * @param int $lesson
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $course, $lesson)
    {
        if($request->hasFile('content')){
            $validator = Validator::make($request->all(),[
                'order' => 'nullable|numeric',
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'type' => 'nullable|string',
                'content' => 'nullable|file',
                'mime' => 'nullable|string'
            ],[
                'title.required' => 'O campo título está vazio.'
            ]);
        }else{
            $validator = Validator::make($request->all(),[
                'order' => 'nullable|numeric',
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'type' => 'nullable|string',
                'content' => 'nullable|string',
                'mime' => 'nullable|string'
            ],[
                'title.required' => 'O campo título está vazio.'
            ]);
        }

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $lesson = Lesson::findOrFail($lesson);

        try{
            if($request->hasFile('content') && $request->file('content')->isValid()) {
                Lesson::whereId($lesson->id)->update($request->except(['_method', 'content']));
                Lesson::updateFileLesson($request,$lesson);
            }else if($request->type == 'text'){
                Lesson::whereId($lesson->id)->update($request->All());
            }else{
                Lesson::whereId($lesson->id)->update($request->except(['_method', 'content']));
            }
        }catch(ModelNotFoundException $e){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
        
        return response()->json($lesson->id, 200);
        //204: No content. When an action was executed successfully, but there is no content to return.
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $course
     * @param int $lesson
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

    public function media($course,$lesson){
        $course = Course::findOrFail($course);
        $lesson = Lesson::findOrFail($lesson);

        return response()->file(base_path() . '/storage/app/public/' . $lesson->content);
       
    }

    /**
     * Order list of lessons
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function order(Request $request,$course){
        $course = Course::findOrFail($course);
        if($request->lessons){
            $data = $request->json()->all();
            $i = 1;
            foreach($data['lessons'] as $lesson){
                Lesson::whereId($lesson->id)->update(['order'=> $i]);
                $i++;
            }
            return response()->json(204);
        }else{
            return response()->json(400);
        }
    }

}
