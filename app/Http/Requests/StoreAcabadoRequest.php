<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAcabadoRequest extends FormRequest
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
}