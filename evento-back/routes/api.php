<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminDashboard;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ReservationController;
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

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/registerOrganizator', 'registerOrganizator');
    Route::post('/login', 'login');
});

Route::get('/allCategories', [CategoryController::class, 'index']);
Route::controller(EventController::class)->group(function () {
    Route::get('/events', 'index');
});
Route::get('/event/{id}', [EventController::class, 'getEventById']);
Route::get('/related/{id}', [EventController::class, 'getRelatedEvent']);



Route::get('/allUsers', [AdminController::class, 'displayUsers']);



Route::middleware(['auth:api'])->group(function () {
    // admin routes

    Route::middleware(['role:admin'])->group(function () {
        Route::resource('categories', CategoryController::class);
        Route::post('/updateCategory/{id}', [CategoryController::class, 'update']);
        Route::post('/deleteCategory/{id}', [CategoryController::class, 'destroy']);
        Route::post('accept/{id}', [EventController::class, 'confirmEvent']);
        Route::get('dashboardData', [AdminDashboard::class, 'getDashboardData']);
        Route::get('eventsDetail', [AdminDashboard::class, 'getEventDetails']);



    });

    // admin routes

    // organization routes
    Route::middleware(['role:organizer'])->group(function () {
        Route::post('addEvent', [EventController::class, 'store']);
        Route::get('myEvents', [EventController::class, 'myevents']);

    });

    Route::middleware(['role:reservator'])->group(function () {
        Route::post('reserve/{id}', [EventController::class, 'reserveTicket']);
        Route::get('myreservations', [ReservationController::class, 'getUserReservations']);


    });







    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);


});