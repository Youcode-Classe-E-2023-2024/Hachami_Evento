<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{
    
    public function displayUsers(){
        try {
            $users = User::whereHas('roles', function ($query) {
                    $query->where('name', '<>', 'admin');
                })
                ->select('id', 'name', 'email','created_at')
                ->get();
    
            return response()->json(['users' => $users], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    

}
