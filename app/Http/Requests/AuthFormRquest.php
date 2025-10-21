<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthFormRquest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

    public function rules(): array
    {
        return [
            'email' => ['required', 'email:rfc,dns',],
            'password' => ['required'/*, 'current_password'*/],
        ];
    }


    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'email.required' => 'O campo e-mail é obrigatório.',
            'email.email' => 'Forneça um e-mail válido.',

            'password.required' => 'O campo senha é obrigatório.',
            'password.current_password' => 'Senha Incorreta!',
        ];

    }
}
