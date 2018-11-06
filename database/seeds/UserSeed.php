<?php

use Illuminate\Database\Seeder;

class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [
            
            ['id' => 1, 'name' => 'Admin', 'email' => 'admin@admin.com', 'password' => '$2y$10$jB5p7HpqZ5vFbYLMP7RaSeZGJjswqlEPWb51j0YRnLA/azFtJ2BOK', ],
            ['id' => 2, 'name' => 'Instructor', 'email' => 'instructor@instructor.com', 'password' => '$2y$10$wtVeMS/o0UUsW1OqEtF16.bfySgezIXZLMhKhAdls1A1KWVRc9X3i', ],
            ['id' => 3, 'name' => 'Student', 'email' => 'student@student.com', 'password' => '$2y$10$GnZSqyRAfThj60Zg3sUW2uO7mihIXAOE2ALwahHJbE9Xf6ODtzbiG',],
        ];
        foreach ($items as $item) {
            \App\User::create($item);
        }
    }
}
