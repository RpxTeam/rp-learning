<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Team;
use App\User;

class TeamController extends Controller
{
    /**
     * Display All Teams.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $teams = Team::All()->each(function ($team){
            $user = User::where('id',$team->leader)->first();

            $count = DB::table('user_teams')
                        ->where('team_id',$team->id)
                        ->count();

            $team->setAttribute('members_count', $count);
            $team->setAttribute('leader', $user);
        });

        return response()->json($teams, 200);
    }
    
    /**
     * Display specific Team.
     *
     * @param  int  $team
     * @return \Illuminate\Http\Response
     */
    public function show($team)
    {
        $team = Team::findOrFail($team);
        $user = User::where('id',$team->leader)->first();

        $count = DB::table('user_teams')
                        ->where('team_id',$team->id)
                        ->count();

        $members = DB::table('user_teams')
                        ->where('team_id',$team->id)
                        ->get();
       
        foreach($members as $member){
            $user = User::where('id',$member->user_id)-> first();
            if($user->image){
                $user->image = Storage::url($user->image);
            }
            $member->id = $user->id;
            $member->image = $user->image;
            $member->mime = $user->mime;
            $member->level = $user->level;
            $member->role_id = $user->role_id;
        }
        $team->setAttribute('members_count', $count);
        $team->setAttribute('leader', $user);
        $team->setAttribute('members', $members);
        

        return response()->json($team, 200);
    }

    /**
     * Store new team
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if($request->hasFile('image') && $request->file('image')->isValid()) {
            $team = Team::create($request->except('image'));
            Team::uploadImage($request , $team);
        }else{
            $team = Team::create($request->except('image'));
        }

        return response()->json($team->id, 200);
    }

    /**
     * Update specific team
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $team
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $team)
    {
        $team = Team::findOrFail($team);

        if($request->hasFile('image') && $request->file('image')->isValid()) {
            Team::whereId($team->id)->update($request->except(['_method','image']));
            Team::uploadImage($request , $team);
        }else{
            Team::whereId($team->id)->update($request->except(['_method','image']));
        }

        return response()->json(204);
    }

    /**
     * delete specific team
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($team)
    {
        $team = Team::findOrFail($team);

        if(Storage::exists($team->image)){
            Storage::delete($team->image);
        }
        $team->delete();

        return response()->json(204);
    }

    /**
     * Add n user to the team
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function add(Request $request){
        $data = json_decode($request->getContent(), true);
        

        foreach($data['users'] as $register){
            $user = DB::table('user_teams')
                    ->where('user_id',$register['user_id'])
                    ->where('team_id',$register['team_id'])
                    ->first();

            if(!$user){
                DB::table('user_teams')->insert([
                    'user_id' => $register['user_id'],
                    'team_id' => $register['team_id'],
                ]);
            }
        }

        return response()->json(204);
    }

    /**
     * Remove n user of the team
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function remove(Request $request){

        $data = json_decode($request->getContent(), true);
        

        foreach($data['users'] as $register){
            $user = DB::table('user_teams')
                    ->where('user_id',$register['user_id'])
                    ->where('team_id',$register['team_id'])
                    ->first();

            if($user){
                DB::table('user_teams')
                ->where('user_id',$register['user_id'])
                ->where('team_id',$register['team_id'])
                ->delete();
            }
        }

        return response()->json(204);
    }
}
