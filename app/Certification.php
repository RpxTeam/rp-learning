<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    protected $fillable = ['title','user_id','course_id','image','mime'];
    protected $hidden = [];
    public static $searchable = [
    ];

    public static function uploadImageCertification(Request $request, Certification $certification){
        $filename = $certification->id . '-certification.' . $request->file('image')->getClientOriginalExtension();
        $request->file('image')->storeAs('certifications/users', $filename);
        $certification->image = 'certifications/users/' . $filename;
        $certification->mime = $request->file('image')->getClientMimeType();
        $certification->save();
    }

    public static function updateImageCertification(Request $request, Certification $certification){
        $filename = $certification->id .  '-certification.' . $request->file('image')->getClientOriginalExtension();
        $filepath = 'certifications/users/' . $filename;
        if(Storage::exists($filepath)){
            Storage::delete($filepath);
        }
        $request->file('image')->storeAs('certifications/users', $filename);
        $certification->image =  $filepath;
        $certification->mime = $request->file('image')->getClientMimeType();
        $certification->save();
    }
}
