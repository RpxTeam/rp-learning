<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

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
            
            ['id' => 1, 'name' => 'Admin', 'email' => 'admin@admin.com', 'password' => '$2y$10$jB5p7HpqZ5vFbYLMP7RaSeZGJjswqlEPWb51j0YRnLA/azFtJ2BOK','role_id' => 1, ],
            ['id' => 2, 'name' => 'Instructor', 'email' => 'instructor@instructor.com', 'password' => '$2y$10$wtVeMS/o0UUsW1OqEtF16.bfySgezIXZLMhKhAdls1A1KWVRc9X3i','role_id' => 2, ],
            ['id' => 3, 'name' => 'Student', 'email' => 'student@student.com', 'password' => '$2y$10$GnZSqyRAfThj60Zg3sUW2uO7mihIXAOE2ALwahHJbE9Xf6ODtzbiG','role_id' => 3,],
        ];
        foreach ($items as $item) {
            \App\User::create($item);
        }

        // $faker = Faker\Factory::create();
        //
        // for($i=0;$i<10;$i++){
        //     DB::table('users')->insert([
        //         'name' => $faker->firstName,
        //         'email' => $faker->email,
        //         'password' => Hash::make('password'),
        //         'birthday' => Carbon::createFromTimeStamp($faker->dateTimeBetween('-90 years', 'now')->getTimestamp())->format('Y/m/d'),
        //         'adress' => $faker->word,
        //         'age' => $faker->numberBetween($min = 18, $max = 60),
        //         'role_id' => 3,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ]);
        // }
    }
}
