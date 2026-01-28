<?php

use Illuminate\Support\Facades\Route;

// Ruta vacía por ahora
Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
