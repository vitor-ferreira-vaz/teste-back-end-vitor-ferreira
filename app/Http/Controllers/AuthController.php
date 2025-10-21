<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthFormRquest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct()
    {

    }

    public function login(AuthFormRquest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            $user_validatidion = Auth::attempt(['email' => $user->email, 'password' => $request->password]);
            if ($user_validatidion) {
                $token = $user->createToken('token_random_name');
                return response()->json(
                    [
                        'success' => true,
                        'message' => "Login concluído!",
                        "token" => "Bearer $token->plainTextToken",
                        "id" => $user->id,
                    ], 200)
                    ->header('Authorization', "Bearer $token->plainTextToken");
            }
        } catch (\Exception $e) {
            return response()->json(['report_type' => 'failure', 'success' => false, 'message' => 'ERRO: E-mail ou senha incorreta!'], 500);
        }

    }
    public function CheckUser(Request $request)
    {
        return response()->json(['report_type' => 'success', 'success' => true, 'message' => $request->all()], 200);
    }

    public function Logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['report_type' => 'success', 'success' => true, 'message' => "Logout realizado com sucesso!"]);
    }
}
