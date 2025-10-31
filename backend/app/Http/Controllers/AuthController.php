<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{

    public function __construct() {
        $this->middleware("auth:sanctum")->except(['login']);
    }

    public function login(Request $request) {
        try {
            $validated = $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors()
            ], 422);
        }

        $user = User::where('email', $validated['email'])->first();

        if ($user && $user->password === $validated['password']) {
            $userTokens = $user->tokens();
            if ($userTokens) {
                $userTokens->delete();
            }
            $token = $user->createToken("ADMIN_TOKEN")->plainTextToken;
            return response()->json([
                'token' => $token
            ], 200);
        } else {
            return response()->json([
                'errors' => [
                    'credentials' => 'Invalid Credentials!'
                ]
            ], 422);
        }
    }

    public function authorize_check() {
        return response()->json([
            "authorized" => true 
        ], 200);
    }
}