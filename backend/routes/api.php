<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/tasks', [TaskController::class, 'getAll']);
Route::prefix('/tasks')->group(function () {
    Route::post('/', [TaskController::class, 'create']);
    Route::get('/{id}', [TaskController::class, 'getById']);
    Route::put('/{id}', [TaskController::class, 'update']);
    Route::delete('/{id}', [TaskController::class, 'delete']);
    Route::patch('/{id}/completed', [TaskController::class, 'completed']);
    Route::patch('/{id}/uncompleted', [TaskController::class, 'uncompleted']);
});
