<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAcabadoRequest extends FormRequest
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
            "nombre" =>"required|max:255",
            "coleccion_id" =>"required|int",
            "descripcion" =>"required|max:255",
            "color" =>"required|max:255",
            "precio_m2" =>"required|max:255",
        ];
    }
    /**
     * Get the validation messages that apply to the request.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.max' => 'El campo nombre no puede exceder de 255 caracteres.',
            'coleccion_id.required' => 'El campo colección es obligatorio.',
            'coleccion_id.int' => 'El campo colección debe ser un número entero.',
            'descripcion.required' => 'El campo descripción es obligatorio.',
            'descripcion.max' => 'El campo descripción no puede exceder de 255 caracteres.',
            'color.required' => 'El campo color es obligatorio.',
            'color.max' => 'El campo color no puede exceder de 255 caracteres.',
            'precio_m2.required' => 'El campo precio por m² es obligatorio.',
            'precio_m2.max' => 'El campo precio por m² no puede exceder de 255 caracteres.',
        ];
    }
}
