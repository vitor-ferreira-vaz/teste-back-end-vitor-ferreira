<?php

namespace App\Contracts\Repositories;

use Illuminate\Http\JsonResponse;

interface CategoriaRepositoryInterface
{
    public function all();

    public function find(int $id): JsonResponse;

    public function create(array $data): JsonResponse;

    public function update(int $id, array $data): JsonResponse;

    public function delete(int $id): JsonResponse;

    public function buildList(): JsonResponse;
}
