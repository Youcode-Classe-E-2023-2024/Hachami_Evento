<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
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
    public function rules()
    {
        return [
            'title' => 'required|string|max:500',
            'description' => 'required|string|max:1000',
            'category_id' => 'required|exists:categories,id',
            'event_date' => 'required',
            'location' => 'required|string|max:600',
            'ticketsEvent' => 'required|integer',

            'images' => 'required|file|mimes:jpeg,png,jpg,gif|max:2048', 
        ];
    }
}
