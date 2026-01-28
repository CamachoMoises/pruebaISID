<?php

use App\Http\Controllers\CourseController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InstructorController;

Route::get('/', function () {
    return redirect('/dashboard');
});

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/instructors', [InstructorController::class, 'index'])->name('instructors.index');
Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
