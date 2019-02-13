<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use App\Course;
use App\User;
use App\Certification;

class CertificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($user, $course)
    {
        $user = User::findOrFail($user);
        $course = Course::findOrFail($course);

        $complete = DB::table('data_courses')
                    ->where('user_id',$user->id)
                    ->where('course_id',$course->id)
                    ->first();
        
        if($complete->finish != null && $complete->progress == 100 ){
            $certificate = DB::table('templates')->whereId($course->template_id)->first();
            
            $data = collect();
            $data->push([
                'user' => $user->name,
                'course' => $course->title,
                'complete' => $complete->finish,
                'image' =>  Storage::url($certificate->image),
                'mime' => $certificate->mime
            ]);

            return response()->json($data, 200);
        }else{
            return response()->json(400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $user, $course)
    {
        $user = User::findOrFail($user);
        $course = Course::findOrFail($course);

        if($request->hasFile('image') && $request->file('image')->isValid()){
            $certificate = Certification::create($request->All() + ['user_id' => $user->id, 'course_id' => $course->id]);
            Certification::uploadImageCertification($request, $certificate);

            return response()->json($certificate->id,200);
        }else {
            return response()->json(400);
        }
    }

    public function user($user){
        $user = User::findOrFail($user);

        $certificates = DB::table('certificates')
                        ->where('user_id', $user->id)
                        ->get();

       if(!empty($certificates)){
           return response()->json($certificates, 200);
       }else{
           return response()->json(400);
       }
    }
}
