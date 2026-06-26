<?php
use App\Http\Controllers\Api\PublicContentController;
use Illuminate\Support\Facades\Route;
Route::get('services',[PublicContentController::class,'services']);
Route::get('packages',[PublicContentController::class,'packages']);
Route::get('gallery',[PublicContentController::class,'gallery']);
Route::post('feedback',[PublicContentController::class,'feedback']);
Route::get('testimonials',[PublicContentController::class,'testimonials']);
Route::post('testimonials',[PublicContentController::class,'storeTestimonial']);
Route::post('visits',[PublicContentController::class,'visit']);
