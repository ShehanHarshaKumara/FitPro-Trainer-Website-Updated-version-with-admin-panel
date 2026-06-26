<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration { public function up(): void { Schema::table('feedback', function (Blueprint $table) { $table->string('type')->default('inquiry')->after('id'); $table->string('role')->nullable()->after('name'); $table->unsignedTinyInteger('rating')->nullable()->after('role'); $table->string('result')->nullable()->after('message'); $table->string('image')->nullable()->after('result'); $table->boolean('is_published')->default(false)->after('status'); }); } public function down(): void { Schema::table('feedback', function (Blueprint $table) { $table->dropColumn(['type','role','rating','result','image','is_published']); }); } };
