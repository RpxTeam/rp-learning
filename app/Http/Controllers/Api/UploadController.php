<?php

namespace App\Http\Controllers\Api;

use App\upload;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Course;
use App\Lesson;

class UploadController extends Controller
{
    /**
     * Upload Lesson Image
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function upload(Request $request){
        if($request->hasFile('image') && $request->file('image')->isValid()){
            date_default_timezone_set('America/Sao_Paulo');
            $filepath = 'lessons/images/';
            $filename = date('YmdHis') . rand(1, 100000) . $request->file('image')->getClientOriginalName();
            $request->file('image')->storeAs($filepath, $filename);

            $data = Storage::url($filepath . $filename);

            return response()->json($data, 200);
        }else{
            return response()->json(400);
        }
    }
}
