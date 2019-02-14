<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class Team extends Model
{
    protected $fillable = ['name', 'description', 'image', 'mime','leader'];
    protected $hidden = [];
    public static $searchable = [
    ];

    public static function uploadImage(Request $request, Team $team){
        $filename = $team->id . '-' . str_slug($team->title) . '.' . $request->file('image')->getClientOriginalExtension();
        $request->file('image')->storeAs('teams/image', $filename);
        $team->image = 'teams/image/' . $filename;
        $team->mime = $request->file('image')->getClientMimeType();
        $team->save();
    }

    public static function updateImage(Request $request, Team $team){
        $filename = $team->id . '-' . str_slug($team->title) . '.' . $request->file('image')->getClientOriginalExtension();
        $filepath = 'teams/image/' . $filename;
        if(Storage::exists($$team->image)){
            Storage::delete($team->image);
        }
        $request->file('image')->storeAs('teams/image', $filename);
        $team->image =  $filepath;
        $team->mime = $request->file('image')->getClientMimeType();
        $team->save();
    }
}
