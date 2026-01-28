<?php

use App\Http\Controllers\CourseController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InstructorController;

Route::get('/', function () {
    return redirect('/dashboard');
});
Route::prefix('dashboard')->group(
    function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/sync', [DashboardController::class, 'sync'])->name('dashboard.sync');
    }
);

Route::prefix('instructors')->group(function () {
    Route::get('/', [InstructorController::class, 'index'])->name('instructors.index');
});

Route::prefix('courses')->group(function () {
    Route::get('/', [CourseController::class, 'index'])->name('courses.index');
    Route::get('/{course}', [CourseController::class, 'show'])->name('courses.show');
    Route::get('/create', [CourseController::class, 'create'])->name('courses.create');
    Route::post('/', [CourseController::class, 'store'])->name('courses.store');
    Route::get('/{course}/edit', [CourseController::class, 'edit'])->name('courses.edit');
    Route::put('/{course}', [CourseController::class, 'update'])->name('courses.update');
    Route::delete('/{course}', [CourseController::class, 'destroy'])->name('courses.destroy');
    Route::get('/rating', [DashboardController::class, 'rating'])->name('courses.rating');
});
