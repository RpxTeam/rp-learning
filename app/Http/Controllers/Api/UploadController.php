<?php

namespace App\Http\Controllers\Api;

use App\upload;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
  
    public function upload(Request $request){

        if($request->hasFile('file') && $request->file('file')->isValid()){
            $filepath = 'lessons/images/';
            $filename = $request->file('file')->getClientOriginalName();
            $request->file('file')->storeAs($filepath, $filename);

            return Storage::url($filepath . $filename);
        }
    }
}
