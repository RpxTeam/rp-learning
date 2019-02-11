<?php

use Illuminate\Database\Seeder;

class CertificationSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        App\Certification::create([
            'title' => 'ceertification 01',
            'image' => 'certification/images/1-certification.png',
            'mime' => 'image/png'
        ]);
    }
}
