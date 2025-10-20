<?php

namespace App\Repositories;

use App\Contracts\Repositories\UsuarioRepositoryInterface;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Spatie\Backtrace\Arguments\Reducers\StdClassArgumentReducer;

class UsuarioRepository implements UsuarioRepositoryInterface

{
    public function all()
    {
        return User::all();
    }

    public function find(int $id): User
    {
        return User::find($id);
    }

    public function create(array $data): JsonResponse
    {
        $return = [
            'success' => true,
            'message' => 'Usuario cadastrado com sucesso!'
        ];
        try {
            DB::beginTransaction();
            User::create($data);
            DB::commit();
        } catch (\Exception $e) {
            $return['success'] = false;
            $return['message'] = $e->getMessage();
            DB::rollBack();
        }
        return response()->json([$return]);
    }

    public function update(int $id, array $data): JsonResponse
    {
        // TODO: Implement update() method.
        $return = [
            'success' => true,
            'message' => 'Usuario atualizado com sucesso!'
        ];
        try {
            DB::beginTransaction();
            User::find($id)->update($data);
            DB::commit();
        } catch (\Exception $e) {
            $return['success'] = false;
            $return['message'] = $e->getMessage();
            DB::rollBack();
        }
        return response()->json([$return]);
    }

    public function delete(int $id): JsonResponse
    {
        $this->find($id)->delete();
        return response()->json([
            'success' => true,
            'message' => 'Usuario excluido com sucesso!'
        ]);
    }

}
