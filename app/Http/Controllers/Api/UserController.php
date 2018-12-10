<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\User;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use App\Mail\teste;

class UserController extends Controller
{
    private $user;
    public function __construct(User $user){
        $this->user = $user;
    }

    public function register(Request $request){
        $user = $this->user->create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password'))
        ]);

        return response()->json(['status'=>true,'message'=>'User created successfully','data'=>$user]);

    }

    public function login(Request $request){
        $credentials = $request->only('email', 'password');
        $token = null;
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['invalid_email_or_password'], 422);
            }
        } catch (JWTAuthException $e) {
            return response()->json(['failed_to_create_token'], 500);
        }
        return response()->json(compact('token'));
    }

    public function getAuthUser(Request $request){
        $user = JWTAuth::toUser($request->token);
        return response()->json(['result' => $user]);
    }

     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $users = User::All()->each(function($user){
                if($user->image != null){
                    $user->image = Storage::url($user->image);
                }
            });
        }catch(ModelNotFoundException $e){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
        return response()->json($users,200);
        //200: OK. The standard success code and default option.
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{
            $user = User::findOrFail($id);
            if($user->image != null){
                $user->image = Storage::url($user->image);
            }
            //Mail::to('fehiya@gmail.com')->send(new teste());
        }catch(ModelNotFoundException $e){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
        return response()->json($user,200);
        //200: OK. The standard success code and default option.
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            if($request->hasFile('image') && $request->file('image')->isValid()) {
                $request['password'] = Hash::make($request->password);
                $user = User::create($request->except('image'));
                User::uploadImageUser($request , $user);
            }else{
                $request['password'] = Hash::make($request->password);
                User::create($request->except('image'));
            }
        }catch(ModelNotFoundException $e){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
        return response()->json(201);
        //201: Object created. Useful for the store actions.
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try{
            if($request->hasFile('image') && $request->file('image')->isValid()) {
                $user = User::findOrFail($id);
                $request['password'] = Hash::make($request->password);
                User::whereId($user->id)->update($request->except(['_method','image']));
                User::updateImageUser($request,$user);
            }else{
                $user = User::findOrFail($id);
                $request['password'] = Hash::make($request->password);
                User::whereId($user->id)->update($request->except(['_method','image']));
            }
        }catch(ModelNotFoundException $e){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
        return response()->json(204);
        //204: No content. When an action was executed successfully, but there is no content to return.
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            $user = User::findOrFail($id);
            if(Storage::exists($user->image)){
                Storage::delete($user->image);
            }
            $user->delete();
        }catch(ModelNotFoundException $e){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
        return response()->json(204);
        //204: No content. When an action was executed successfully, but there is no content to return.
    }
}
