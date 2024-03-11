<?php

use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\PenghuniController;
use App\Http\Controllers\RiwayatRumahController;
use App\Http\Controllers\RumahController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('penghuni', PenghuniController::class);
Route::apiResource('rumah', RumahController::class);
Route::apiResource('riwayatrumah', RiwayatRumahController::class);
Route::apiResource('pembayaran', PembayaranController::class);
Route::get('getpenghuni', [PenghuniController::class, 'getPenghuni']);
Route::get('getdatachart', [PembayaranController::class, 'getChartData']);
Route::get('getsaldo', [PembayaranController::class, 'getSaldo']);
