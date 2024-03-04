<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data,[
            'name'     => 'required',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed'
            
        ]);


       

        if ($validator->fails()) {
            return response()->json([
                'status'          => false,
                'validationError' => $validator->errors()
            ]);
        }else{
            $user = User::create([
                'name'     => $data['name'],
                'email'    => $data['email'],
                'password' => Hash::make($data['password'])
            ]);

            if ($user == true) {
                return response()->json([
                    'status'  => true,
                    'message' => 'User created successfully'
                ], 200);
            }else{
                return response()->json([
                    'status'  => false,
                    'message' => 'User registration failed'
                ], 404);
            }

        }
    }
}
