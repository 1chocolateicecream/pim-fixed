<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductGroupController;
use App\Http\Controllers\ProductsController;
use Illuminate\Support\Facades\Route;

Route::post('/admin/login', [AuthController::class, 'login']);
Route::get('/admin/authorize', [AuthController::class, 'authorize_check']);

Route::apiResource('/product-group', ProductGroupController::class);
Route::post('/product-group/{Group}/products', [ProductsController::class, 'save']);

Route::get('/products', [ProductsController::class, 'index']);
Route::get('/products/{product}', [ProductsController::class, 'show']);
Route::put('/products/{product}', [ProductsController::class, 'update']);
Route::delete('/products/{product}', [ProductsController::class, 'destroy']);
