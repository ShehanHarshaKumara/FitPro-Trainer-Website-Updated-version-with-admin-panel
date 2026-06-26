<?php

namespace Database\Seeders;

use App\Models\{Package, Service, User};
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(['email' => 'admin@fitpro.test'], ['name' => 'FitPro Admin', 'password' => Hash::make('ChangeMe123!')]);
        Service::firstOrCreate(['title' => '1-on-1 Personal Training'], ['description' => 'Onsite or live video coaching focused on technique, performance, and accountability.', 'features' => ['Onsite sessions', 'Live video coaching', 'Form correction', 'Goal-based programming'], 'icon' => 'dumbbell', 'sort_order' => 1]);
        Package::firstOrCreate(['slug' => 'foundation'], ['title' => 'FOUNDATION', 'duration' => '3-Month Coaching Program', 'price' => 'Rs. 66,500', 'description' => 'A results-driven coaching experience for consistent progress.', 'features' => ['Personalized meal plan', 'Custom training program', 'Weekly check-ins'], 'sort_order' => 1]);
    }
}
