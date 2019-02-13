<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Storage;
use App\Template;

class TemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $templates = Template::All()->each(function($template){

            if($template->image != null){
                $template->image = Storage::url($template->image);
            }
        });

       return response()->json($templates, 200);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($template)
    {
        $template = Template::findOrFail($template);

        if($template->image != null){
            $template->image = Storage::url($template->image);
        }

        return response()->json($template, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if($request->hasFile('image') && $request->file('image')->isValid()){
            $template = Template::create($request->except('image'));
            Template::uploadImageTemplate($request,$template);

            return response()->json($template->id,200);
        }else {
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
    public function update(Request $request, $template)
    {
        $template = Template::findOrFail($template);

        if($request->hasFile('image') && $request->file('image')->isValid()){
           Template::whereId($template->id)->update($request->except(['_method','image']));
            Template::updateImageTemplate($request,$template);
        }else {
           Template::whereId($template->id)->update($request->except(['_method','image']));
        }

        return response()->json(204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($template)
    {
        $template = Template::findOrFail($template);

        $template->delete();

        return response()->json(204);
    }
}
