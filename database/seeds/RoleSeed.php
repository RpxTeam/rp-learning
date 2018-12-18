<?php

use Illuminate\Database\Seeder;

class RoleSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            ['id' => 1,'title'=>'Admin'],
            ['id' => 2,'title'=>'Instructor'],
            ['id' => 3,'title'=>'Student'],
        ];

        foreach($roles as $role){
            App\Role::create($role);
        }
        
    }
}
