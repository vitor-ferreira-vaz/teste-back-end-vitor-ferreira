<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\CategoriaController;

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


Route::post('/users/InsertUser', [UsuarioController::class, 'Insert'])->name('insert');
Route::post('/users/Find/{id?}', [UsuarioController::class, 'Find'])->name('find_user');
Route::post('/users/Login', [AuthController::class, 'Login'])->name('login');
Route::post('/users/CheckUser', [AuthController::class, 'CheckUser'])->middleware('auth:sanctum');
Route::post('/users/Logout', [AuthController::class, 'Logout'])->middleware('auth:sanctum');
Route::post('/users/ResetPassword', [AuthController::class, 'ResetPassword']);

/*Produto*/
Route::post('/Produto/All', [ProdutoController::class, 'All'])->middleware('auth:sanctum');
Route::post('/Produto/BuildList', [ProdutoController::class, 'BuildList'])->middleware('auth:sanctum');
Route::post('/Produto/Find/{id?}', [ProdutoController::class, 'Find'])->middleware('auth:sanctum');
Route::post('/Produto/Insert', [ProdutoController::class, 'Insert'])->middleware('auth:sanctum');
Route::post('/Produto/Update/{id?}', [ProdutoController::class, 'Update'])->middleware('auth:sanctum');
Route::post('/Produto/Delete/{id?}', [ProdutoController::class, 'Delete'])->middleware('auth:sanctum');

/*Categoria*/
Route::post('/Categoria/All', [CategoriaController::class, 'All'])->middleware('auth:sanctum');
Route::post('/Categoria/BuildList', [CategoriaController::class, 'BuildList'])->middleware('auth:sanctum');
Route::post('/Categoria/Find/{id?}', [CategoriaController::class, 'Find'])->middleware('auth:sanctum');
Route::post('/Categoria/Insert', [CategoriaController::class, 'Insert'])->middleware('auth:sanctum');
Route::post('/Categoria/Update/{id?}', [CategoriaController::class, 'Update'])->middleware('auth:sanctum');
Route::post('/Categoria/Delete/{id?}', [CategoriaController::class, 'Delete'])->middleware('auth:sanctum');
