<?php

use App\Http\Controllers\Api\V1\PetController;
use App\Http\Controllers\Api\V1\ReportController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Api\V1\ClientController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['api'], 'prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('refresh', [AuthController::class, 'refresh'])->name('refresh');
});

Route::group(['middleware' => ['checkApiKey'], 'prefix' => 'v1'], function () {
    Route::group(['middleware' => ['auth:api'], 'prefix' => 'admin'], function () {
        Route::get('clients/all', [ClientController::class, 'all']);
        Route::apiResource('clients', ClientController::class);
        Route::get('pets/all', [PetController::class, 'all']);
        Route::apiResource('pets', PetController::class);
        Route::apiResource('reports', ReportController::class);
    });
});
