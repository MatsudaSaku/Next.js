<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
        public function register(Request $request)
    {
        $request->validate([
            'user.username' => 'required|string|unique:users,username',
            'user.email' => 'required|string|email|unique:users,email',
            'user.password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'username' => $request->input('user.username'),
            'email' => $request->input('user.email'),
            'password' => Hash::make($request->input('user.password')),
            'bio' => 'Default bio',
            'image' => 'default_image_url',
        ]);

        $token = 'token';

        return response()->json(['user' => [
            'email' => $user->email,
            'username' => $user->username,
            'bio' => $user->bio,
            'image' => $user->image,
            'token' => $token,
        ]]);
    }
}