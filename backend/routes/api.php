<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Barang\{
    CreateBarang,
    DeleteBarang,
    FindBarang,
    UpdateBarang,
    ViewAllBarang
};
use App\Http\Controllers\Penjualan\{
    CreateController,
    DeleteController,
    FindController,
    UpdateController,
    ViewAllController
};
use App\Http\Controllers\Pelanggan\{
    CreateController as CreatePelanggan,
    DeleteController as DeletePelanggan,
    FindController as FindPelanggan,
    UpdateController as UpdatePelanggan,
    ViewAllController as ViewAllPelanggan
};
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['prefix' => 'v1'], function(){
    Route::group(['prefix' => 'barang'], function(){
        Route::get('/', [ViewAllBarang::class, 'index'])->name('barang.view_all');
        Route::get('/{id}', [FindBarang::class, 'index'])->name('barang.find');
        Route::post('/', [CreateBarang::class, 'index'])->name('barang.save');
        Route::put('/{id}', [UpdateBarang::class, 'index'])->name('barang.update');
        Route::delete('/{id}', [DeleteBarang::class, 'index'])->name('barang.delete');
    });
    Route::group(['prefix' => 'pelanggan'], function(){
        Route::get('/', [VIewAllPelanggan::class, 'index'])->name('pelanggan.view_all');
        Route::get('/{id}', [FindPelanggan::class, 'index'])->name('pelanggan.find');
        Route::post('/', [CreatePelanggan::class, 'index'])->name('pelanggan.save');
        Route::put('/{id}', [UpdatePelanggan::class, 'index'])->name('pelanggan.update');
        Route::delete('/{id}', [DeletePelanggan::class, 'index'])->name('pelanggan.delete');
    });
    Route::group(['prefix' => 'penjualan'], function(){
        Route::get('/', [ViewAllController::class, 'index'])->name('penjualan.view_all');
        Route::get('/{id}', [FindController::class, 'index'])->name('penjualan.find');
        Route::post('/', [CreateController::class, 'index'])->name('penjualan.save');
        Route::put('/{id}', [UpdateController::class, 'index'])->name('penjualan.update');
        Route::delete('/{id}', [DeleteController::class, 'index'])->name('penjualan.delete');
    });
});