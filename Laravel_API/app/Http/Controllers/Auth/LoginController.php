<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->input('user');

        if (Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['password']])) {
            $user = User::where('email', $credentials['email'])->first();

            if ($user === null) {
                return response()->json(['error' => 'User not found'], 404);
            }

            $token = $user->createToken('token-name')->plainTextToken;

            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'username' => $user->username,
                    'email' => $user->email,
                    'bio' => $user->bio ?? null,
                    'image' => $user->image ?? null,
                ],
                'token' => $token
            ]);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}
