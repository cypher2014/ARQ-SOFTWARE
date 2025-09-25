<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'required',
                'string',
                'email:rfc,dns', // valida el formato y el dominio
                'max:255',
                Rule::unique(User::class, 'email')
                    ->ignore($this->user()->id_user, 'id_user'), // 👈 corrige la PK
            ],
        ];
    }

    /**
     * Mensajes personalizados para validaciones.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'El nombre completo es obligatorio.',
            'name.string'   => 'El nombre debe ser un texto válido.',
            'name.max'      => 'El nombre no puede superar los 255 caracteres.',

            'email.required' => 'El correo electrónico es obligatorio.',
            'email.string'   => 'El correo electrónico debe ser un texto válido.',
            'email.email'    => 'Debes ingresar un correo electrónico válido.',
            'email.max'      => 'El correo electrónico no puede superar los 255 caracteres.',
            'email.unique'   => 'Este correo electrónico ya está registrado.',
        ];
    }
}
