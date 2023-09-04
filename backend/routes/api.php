<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TasksController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/tasks', [TasksController::class, 'index']);
Route::post('/tasks', [TasksController::class, 'store']);
Route::get('/tasks/{id}', [TasksController::class, 'show']);
