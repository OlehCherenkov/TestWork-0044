<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class BaseController extends Controller
{
    /**
     * @param $result
     * @param string $message
     * @param bool $pagination
     * @return JsonResponse
     */
    public function sendSuccess($result, string $message = '', bool $pagination = false): JsonResponse
    {
        $response = [
            'status' => 'success',
            'data' => ($pagination == true) ? $result->response()->getData() : $result,
        ];
        if (!empty($message)) {
            $response['message'] = $message;
        }
        return response()->json($response);
    }

    /**
     * @param $error
     * @param string $errorMessage
     * @param int $code
     * @return JsonResponse
     */
    public function sendError($error, string $errorMessage = '', int $code = 200): JsonResponse
    {
        $response = [
            'status' => 'error',
            'message' => $error,
        ];
        if (!empty($errorMessage)) {
            $response['data'] = $errorMessage;
        }
        return response()->json($response, $code);
    }
}
