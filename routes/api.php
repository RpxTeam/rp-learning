<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'password'],function() {
	Route::post('/email', 'Auth\ForgotPasswordController@getResetToken');
	Route::post('/reset', 'Auth\ResetPasswordController@reset');
});

Route::group(['prefix'=> 'auth'],function(){
    Route::post('/register','Auth\RegisterController@register');
    Route::post("/login",'Auth\LoginController@login');
    Route::post('/login/{social}/callback','Auth\LoginController@handleProviderCallback')->where('social','twitter|facebook|linkedin|google|');
});

Route::middleware(['jwt_auth'])->group(function(){
   Route::get('/hello',function(){
       return "Cool dude";
   });
});

//Course routes
Route::resource('courses', 'Api\CoursesController');
Route::post('course/{course}','Api\CoursesController@store');
Route::put('course/{id}', 'Api\CoursesController@update');

//user routes
Route::resource('users', 'Api\UserController');
Route::post('user/{user}','Api\UserController@store');
Route::put('user/{id}', 'Api\UserController@update');

//lesson routes
Route::resource('course/{id}/lesson', 'Api\LessonController');
