<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Storage;
use App\Template;

class TemplateController extends Controller
{
    /**
     * Display all templates.
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
     * Display specific template.
     *
     * @param  int  $template
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
     * Store new template.
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
     * Update specific template
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $template
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
     * Delete specific template
     *
     * @param  int  $template
     * @return \Illuminate\Http\Response
     */
    public function destroy($template)
    {
        $template = Template::findOrFail($template);

        $template->delete();

        return response()->json(204);
    }
}
