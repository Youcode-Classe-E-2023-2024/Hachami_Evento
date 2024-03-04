<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminOrganizer extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Admin ',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('12345678'), 
        ]);

        $adminRole = Role::findByName('admin');
        $admin->assignRole($adminRole);

        $organizer = User::create([
            'name' => 'Organizer med',
            'email' => 'organizer1@gmail.com',
            'password' => Hash::make('12345678'), 
        ]);

        $organizerRole = Role::findByName('organizer');
        $organizer->assignRole($organizerRole);

        
    }
}
