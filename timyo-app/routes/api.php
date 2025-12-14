<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (authenticated users)
Route::middleware('auth:sanctum')->group(function () {
    // Get current user
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // User routes - for regular users only
    Route::middleware('isUser')->group(function () {
        Route::get('/appointments', [AppointmentController::class, 'index']);
        Route::post('/appointments', [AppointmentController::class, 'store']);
        Route::delete('/appointments/{appointment}', [AppointmentController::class, 'destroy']);
    });

    // Admin routes - for admins only
    Route::middleware('isAdmin')->prefix('admin')->group(function () {
        // Manage all appointments
        Route::get('/appointments', [AppointmentController::class, 'indexAll']);
        Route::patch('/appointments/{appointment}/status', [AppointmentController::class, 'updateStatus']);
        
        // Manage users
        Route::get('/users', [UserController::class, 'index']);
        Route::get('/users/{user}', [UserController::class, 'show']);
    });
});

