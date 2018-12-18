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

//user routes
Route::resource('users', 'Api\UserController');

//Author routes
Route::resource('author', 'Api\AuthorController');

//Course routes
Route::resource('courses', 'Api\CoursesController');
Route::get('courses/{course}', 'Api\CoursesController@show');

//lesson routes
Route::resource('courses/{course}/lessons', 'Api\LessonController');
Route::get('courses/{course}/lessons', 'Api\LessonController@index');
Route::get('courses/{course}/lessons/{lesson}', 'Api\LessonController@show');

//DataCourse routes
Route::resource('users/{user}/courses', 'Api\DataCourseController');
Route::post('users/{user}/courses/{course}', 'Api\DataCourseController@store');
Route::put('users/{user}/courses/{course}', 'Api\DataCourseController@update');

//DataLesson routes
Route::resource('users/{user}/courses/{course}/lessons', 'Api\DataLessonController');
Route::post('users/{user}/courses/{course}/lessons/{lesson}', 'Api\DataLessonController@store');
Route::put('users/{user}/courses/{course}/lessons/{lesson}', 'Api\DataLessonController@update');
