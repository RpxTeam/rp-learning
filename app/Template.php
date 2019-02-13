<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class Template extends Model
{
    protected $fillable = ['title','active','image','mime', 'user_id'];
    protected $hidden = [];
    public static $searchable = [
    ];

    public static function uploadImageTemplate(Request $request, Template $template){
        $filename = $template->id . '-template.' . $request->file('image')->getClientOriginalExtension();
        $request->file('image')->storeAs('certification/template', $filename);
        $template->image = 'certification/template/' . $filename;
        $template->mime = $request->file('image')->getClientMimeType();
        $template->save();
    }

    public static function updateImageTemplate(Request $request, Template $template){
        $filename = $template->id .  '-template.' . $request->file('image')->getClientOriginalExtension();
        $filepath = 'certification/template/' . $filename;
        if(Storage::exists($filepath)){
            Storage::delete($filepath);
        }
        $request->file('image')->storeAs('certification/template', $filename);
        $template->image =  $filepath;
        $template->mime = $request->file('image')->getClientMimeType();
        $template->save();
    }
}
