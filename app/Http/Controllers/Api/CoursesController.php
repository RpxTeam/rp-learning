<?php

namespace App\Http\Controllers\Api;

use App\Course;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Validator;


class CoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $courses = Course::All()->each(function($course){
                if($course->image != null){
                    $course->image = Storage::url($course->image);
                }
                $course->setAttribute('favorited',Course::getFavoriteCount($course->id));
                $course->setAttribute('viewed',Course::getViewCount($course->id));
            });
        }catch(ModelNotFoundException $e){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
        return response()->json($courses,200);
        //200: OK. The standard success code and default option.
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($course)
    {
        try{
            $course = Course::where('id', $course)
                            ->orWhere('slug', $course)
                            ->firstOrFail();
            if($course->image != null){
                $course->image = Storage::url($course->image);
            }
            $course->setAttribute('favorited',Course::getFavoriteCount($course->id));
            $course->setAttribute('viewed',Course::getViewCount($course->id));
        }catch(ModelNotFoundException $e){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
        return response()->json($course,200);
        //200: OK. The standard success code and default option.
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string',
            'introduction' => 'nullable|string',
            'description' => 'nullable|string',
            'duration' => 'nullable|numeric',
            'image' => 'nullable|file|max:5000|mimetypes:jpeg,png,jpg',
            'mime' => 'nullable|string',
            'instructor' => 'nullable|string',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:start_date'
        ],[
            'title.required' => 'O campo título está vazio.',
            'start_date.required' => 'O campo data de início está vazio.',
            'start_date.after_or_equal' => 'O campo data de início é inválido.',
            'end_date.required' => 'O campo data de término está vazio.',
            'end_date.after_or_equal' => 'O campo data de término é inválido.',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(),400);
        }

        try{
            if($request->slug == null || $request->slug == ""){
                $slug = str_slug($request->title);
            }
            if($request->hasFile('image') && $request->file('image')->isValid()) {
                $course = Course::create($request->except('image')+ ['slug' => $slug]);
                Course::uploadImageCourse($request , $course);
            }else{
                $course = Course::create($request->except('image') + ['slug' => $slug]);
            }
        }catch(ModelNotFoundException $e){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
        return response()->json($course->id,200);
        //201: Object created. Useful for the store actions.
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string',
            'introduction' => 'nullable|string',
            'description' => 'nullable|string',
            'duration' => 'nullable|numeric',
            'image' => 'nullable|file|max:5000|mimetypes:jpeg,png,jpg',
            'mime' => 'nullable|string',
            'instructor' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date'
        ],[
            'title.required' => 'O campo título está vazio.',
            'start_date.required' => 'O campo data de início está vazio.',
            'end_date.required' => 'O campo data de término está vazio.',
            'end_date.after_or_equal' => 'O campo data de término é inválido.',
        ]);

        if($validator->fails()){
                return response()->json($validator->errors(), 400);
        }

        try{
            if($request->hasFile('image') && $request->file('image')->isValid()) {
                $course = Course::findOrFail($id);
                Course::whereId($course->id)->update($request->except(['_method','image']));
                Course::updateImageCourse($request,$course);
            }else{
                $course = Course::findOrFail($id);
                Course::whereId($course->id)->update($request->except(['_method','image']));
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
    public function destroy($id)
    {
        try{
            $course = Course::findOrFail($id);
            if(Storage::exists($course->image)){
                Storage::delete($course->image);
            }
            $course->delete();
        }catch(ModelNotFoundException $e){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
        return response()->json(204);
        //204: No content. When an action was executed successfully, but there is no content to return.
    }
}
