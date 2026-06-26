<?php

use App\Http\Controllers\AdminController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/admin');
Route::get('/login', fn () => redirect()->route('admin.login'))->name('login');
Route::get('/admin/login', [AdminController::class, 'login'])->name('admin.login');
Route::post('/admin/login', [AdminController::class, 'authenticate'])->middleware('throttle:5,1')->name('admin.authenticate');
Route::get('/email/verify', fn () => view('admin.verify-email'))->middleware('auth')->name('verification.notice');
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) { $request->fulfill(); return redirect()->route('admin.dashboard'); })->middleware(['auth', 'signed', 'throttle:6,1'])->name('verification.verify');
Route::post('/email/verification-notification', function (Request $request) { $request->user()->sendEmailVerificationNotification(); return back()->with('success', 'A new verification link was sent.'); })->middleware(['auth', 'throttle:6,1'])->name('verification.send');
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
 Route::get('/',[AdminController::class,'dashboard'])->name('dashboard'); Route::post('/logout',[AdminController::class,'logout'])->name('logout');
 Route::get('/feedback/inbox',[AdminController::class,'feedback'])->name('feedback'); Route::put('/feedback/{feedback}',[AdminController::class,'updateFeedback'])->name('feedback.update');
 Route::get('/{type}',[AdminController::class,'resources'])->whereIn('type',['services','packages','gallery'])->name('resources'); Route::get('/{type}/create',[AdminController::class,'edit'])->whereIn('type',['services','packages','gallery'])->name('create'); Route::get('/{type}/{id}/edit',[AdminController::class,'edit'])->whereIn('type',['services','packages','gallery'])->name('edit'); Route::post('/{type}',[AdminController::class,'save'])->whereIn('type',['services','packages','gallery'])->name('store'); Route::put('/{type}/{id}',[AdminController::class,'save'])->whereIn('type',['services','packages','gallery'])->name('update'); Route::delete('/{type}/{id}',[AdminController::class,'delete'])->whereIn('type',['services','packages','gallery'])->name('delete');
});
