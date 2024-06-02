<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreColeccionRequest extends FormRequest
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
            "formato" =>"required|max:255",
            "thickness" =>"required|max:255",
            "wearlayer" =>"required|max:255",
            "typology" =>"required|max:255",
            "total_thickness" =>"required|max:255",
            'imagen' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
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
            'formato.required' => 'El campo formato es obligatorio.',
            'formato.max' => 'El campo formato no puede exceder de 255 caracteres.',
            'thickness.required' => 'El campo grosor es obligatorio.',
            'thickness.max' => 'El campo grosor no puede exceder de 255 caracteres.',
            'wearlayer.required' => 'El campo capa de desgaste es obligatorio.',
            'wearlayer.max' => 'El campo capa de desgaste no puede exceder de 255 caracteres.',
            'typology.required' => 'El campo tipología es obligatorio.',
            'typology.max' => 'El campo tipología no puede exceder de 255 caracteres.',
            'total_thickness.required' => 'El campo grosor total es obligatorio.',
            'total_thickness.max' => 'El campo grosor total no puede exceder de 255 caracteres.',
            'imagen.required' => 'Debes seleccionar una imagen.',
            'imagen.image' => 'El archivo debe ser una imagen.',
            'imagen.mimes' => 'La imagen debe ser un archivo de tipo: jpeg, png, jpg, gif, svg.',
            'imagen.max' => 'La imagen no puede ser mayor de 2048 kilobytes.',
        ];
    }
}
