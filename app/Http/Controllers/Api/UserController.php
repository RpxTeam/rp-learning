<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\User;
use Validator;
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

    /**
     * register user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request){
        $user = $this->user->create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password'))
        ]);

        return response()->json(['status'=>true,'message'=>'User created successfully','data'=>$user]);

    }

    /**
     * login
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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
     * Display all users.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $users = User::All()->each(function($user){
                if($user->image){
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
     * Display specific user. 
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{
            $user = User::findOrFail($id);
            if($user->image){
                $user->image = Storage::url($user->image);
            }
            //Mail::to('email@email.com')->send(new teste());
        }catch(ModelNotFoundException $e){
            return response()->json(400);
            //400: Bad request. The standard option for requests that fail to pass validation.
        }
        return response()->json($user,200);
        //200: OK. The standard success code and default option.
    }
    
    /**
     * Store a new user on database
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'birthday' => 'nullable|date',
            'adress' => 'nullable|string|max:255',
            'age' => 'nullable|numeric',
            'image' => 'nullable|file|max:5000|mimetypes:jpeg,png,jpg',
            'mime' => 'nullable|string',
            'level' => 'nullable|numeric',
            'role_id' => 'nullable|numeric'
        ],[
            'name.required' => 'O campo nome está vazio.',
            'email.required' => 'O campo e-mail está vazio.',
            'email.unique' => 'O e-mail já utilizado.',
            'password.required' => 'O senha nome está vazio.',
        ]);

        if($validator->fails()){
                return response()->json($validator->errors(), 400);
        }

        try{
            if(!$request->role_id){
                $request['role_id'] = 3;
            }
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
     * Update specific user
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $validator = Validator::make($request->all(),[
        //     'name' => 'nullable|string|max:255',
        //     'email' => 'nullable|string|email|max:255|unique:users',
        //     'password' => 'nullable|string|min:6',
        //     'birthday' => 'nullable|date',
        //     'adress' => 'nullable|string|max:255',
        //     'age' => 'nullable|numeric',
        //     'image' => 'nullable|file|max:5000|mimetypes:jpeg,png,jpg',
        //     'mime' => 'nullable|string',
        //     'level' => 'nullable|numeric',
        //     'role_id' => 'nullable|numeric'
        // ],[
        //     'email.unique' => 'O e-mail já utilizado.',
        // ]);

        // if($validator->fails()){
        //         return response()->json($validator->errors(), 400);
        // }

        try{
            $user = User::findOrFail($id);
            if($request->hasFile('image') && $request->file('image')->isValid()) {
                $request['password'] = Hash::make($request->password);
                User::whereId($user->id)->update($request->except(['_method','image']));
                User::updateImageUser($request,$user);
            }else{
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
     * Delete specific user.
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

    /**
     * Display list of user by total points.
     *
     * @return \Illuminate\Http\Response
     */
    public function points()
    {
        $users = User::All()->each(function($user){
            $$user->setAttribute('total_points', Point::total($user->id));
        });

        $data = $users->sortByDesc('total_points');

        return response()->json($data,200);
    }
}
