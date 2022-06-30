<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'client_id' => ['required', 'exists:App\Models\Client,id'],
            'pet_id' => ['required', 'exists:App\Models\Pet,id'],
            'visit_date' => ['required', 'date'],
            'report' => ['required', 'string', 'max:10000'],
        ];
    }
}
