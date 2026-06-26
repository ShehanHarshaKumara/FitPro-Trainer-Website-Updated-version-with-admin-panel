<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration { public function up(): void { DB::table('users')->where('email', 'manuladamith@gmail.com')->update(['email_verified_at' => now()]); } public function down(): void { DB::table('users')->where('email', 'manuladamith@gmail.com')->update(['email_verified_at' => null]); } };
