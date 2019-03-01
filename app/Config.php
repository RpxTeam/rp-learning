<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class Config extends Model
{
    protected $fillable = ['logo','mime','color-primary','color-secondary'];
    protected $hidden = [];
    public static $searchable = [
    ];

    public static function uploadLogo(Request $request, Config $config){
        $filename = $config->id . '.' . $request->file('logo')->getClientOriginalExtension();
        $request->file('logo')->storeAs('logo/', $filename);
        $config->logo = 'logo/' . $filename;
        $config->mime = $request->file('logo')->getClientMimeType();
        $config->save();
    }

    public static function updateLogo(Request $request, Config $config){
        $filename = $config->id . '.' . $request->file('logo')->getClientOriginalExtension();
        $filepath = 'configs/logo/' . $filename;
        if(Storage::exists($$config->logo)){
            Storage::delete($$config->logo);
        }
        $request->file('logo')->storeAs('configs/logo', $filename);
        $config->logo =  $filepath;
        $config->mime = $request->file('logo')->getClientMimeType();
        $config->save();
    }
}
