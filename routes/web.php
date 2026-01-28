<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Ruta vacía por ahora
Route::get('/', function () {
    return Inertia::render('Welcome');
});
