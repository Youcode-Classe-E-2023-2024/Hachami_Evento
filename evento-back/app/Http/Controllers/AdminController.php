<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{
    
    public function displayUsers(){
        $users = User::with('roles')->get();

        return response()->json($users);
    }
}
