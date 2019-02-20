<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Author;

class AuthorsController extends Controller
{
    /**
     * Display all Authors
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $authors = Author::All();

        }catch(ModelNotFoundException $e){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
        return response()->json($authors,200);
        //200: OK. The standard success code and default option.

        
    }
    
    
    /**
     * Display specific author
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{
            $author = Author::where('id',$id)->firstOrFail();

        }catch(ModelNotFoundException $e){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
        return response()->json($author,200);
        //200: OK. The standard success code and default option.
    }

    /**
     * Create new author
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            Author::create($request->All());

        }catch(ModelNotFoundException $e){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
        return response()->json(204);
        //201: Object created. Useful for the store actions.
    }

    /**
     * Update specific author
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try{
            $author = Author::findOrFail($id);
            Author::whereId($author->id)->update($request->All());

        }catch(ModelNotFoundException $e){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
        return response()->json(204);
        //204: No content. When an action was executed successfully, but there is no content to return.
    }

    /**
     * Delete specific author.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            $author = Author::findOrFail($id);
            $author->delete();

        }catch(ModelNotFoundException $e){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
        return response()->json(204);
        //204: No content. When an action was executed successfully, but there is no content to return.
    }

    public function courseAuthor($request, $course){
        $course = Course::findOrFail($course);

        foreach($request->All() as $author){
            DB::table('course_authors')->insert(
                [
                    'course_id' => $course->id,
                    'author_id' => $author->id,
                ]
            );
        }

        return response()->json(204);
    }

    /**
     * Display all authors of specific course.
     *
     * @param  int  $course
     * @return \Illuminate\Http\Response
     */
    public function listAuthor($course){
        $course = Course::findOrFail($course);
        $authors = DB::table('course_authors')
            ->where('course_id',$course->id)->get();

            return response()->json($authors,200);
    }
}
