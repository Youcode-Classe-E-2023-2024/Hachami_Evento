<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\EventController;
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
    Route::post('/registerOrganizator', 'registerOrganizator');
    Route::post('/login', 'login');
});

Route::get('/allCategories',[CategoryController::class,'index'] );
Route::controller(EventController::class)->group(function() {
    Route::get('/events', 'index');
});





Route::middleware(['auth:api'])->group(function () {
    // admin routes
    
    Route::middleware(['role:admin'])->group(function () {
        Route::get('/allUsers', [AdminController::class , 'displayUsers']);
        Route::resource('categories', CategoryController::class);
        Route::post('accept/{id}', [EventController::class, 'confirmEvent']);


    });

    // admin routes

    // organization routes
    Route::middleware(['role:organizer'])->group(function () {
        Route::post('addEvent', [EventController::class, 'store']);

    });
    






    // Logout
    Route::post('/logout', [AuthController::class , 'logout']);


});