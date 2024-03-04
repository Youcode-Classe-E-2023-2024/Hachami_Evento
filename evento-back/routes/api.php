<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(AuthController::class)->group(function() {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});




Route::middleware(['auth:api'])->group(function () {
    // admin routes
    
    Route::middleware(['role:admin'])->group(function () {
        Route::get('/allUsers', [AdminController::class , 'displayUsers']);
        Route::resource('categories', CategoryController::class);
    });

    // admin routes

    // organization routes
    Route::get('/organizer', function () {
        return 'organizer';
    })->middleware('role:organizer');




    // Logout
    Route::post('/logout', [AuthController::class , 'logout']);


});