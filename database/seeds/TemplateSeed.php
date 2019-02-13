<?php

use Illuminate\Database\Seeder;

class TemplateSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        App\Template::create([
            'title' => 'template 01',
            'image' => 'certification/template/1-template.png',
            'mime' => 'image/png',
            'user_id' => 1
        ]);
    }
}
