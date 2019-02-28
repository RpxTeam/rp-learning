<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Config;

class ConfigController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Config::all();

        return response()->json($data, 200);
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Config::findOrFail($id);

        return response()->json($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if($request->hasFile('logo') && $request->file('logo')->isValid()){
            $config = Config::create($request->all());
            Config::uploadLogo($request, $config);
        }else{
            $config = Config::create($request->all());
        }

        return response()->json($config->id, 200);
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
        $config = Config::findOrFail($id);
        if($request->hasFile('logo') && $request->file('logo')->isValid()){
            Config::whereId($config->id)->update($request->except(['_method']));
            Config::updateLogo($request, $config);
        }else{
            Config::whereId($config->id)->update($request->except(['_method']));
        }

        return response()->json(204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $config = Config::findOrFail($id);

        $config->delete();

        return response()->json(204);
    }
}
