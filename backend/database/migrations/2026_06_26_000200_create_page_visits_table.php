<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration { public function up(): void { Schema::create('page_visits', function (Blueprint $table) { $table->id(); $table->string('path', 255); $table->string('visitor_hash', 64)->nullable()->index(); $table->string('referrer', 500)->nullable(); $table->timestamps(); $table->index(['created_at', 'path']); }); } public function down(): void { Schema::dropIfExists('page_visits'); } };
