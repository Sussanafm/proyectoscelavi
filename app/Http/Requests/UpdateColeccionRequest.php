<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateColeccionRequest extends FormRequest
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
            "total_thickness" =>"required|max:255"
        ];
    }
}
