<?php

namespace App\Repositories;

use App\Contracts\Repositories\CategoriaRepositoryInterface;
use App\Models\Categoria;
use App\Models\ProdutoCategoria;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class CategoriaRepository implements CategoriaRepositoryInterface
{
    public function all()
    {
        return Categoria::all();
    }

    public function find(int $id): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => Categoria::find($id)
        ]);
    }

    public function create(array $data): JsonResponse
    {
        $return = [
            'success' => true,
            'message' => 'Usuario cadastrado com sucesso!'
        ];
        try {
            DB::beginTransaction();
            Categoria::create($data);
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
            Categoria::find($id)->update($data);
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
        if (ProdutoCategoria::whereRaw("categoria_id = $id")) {
            return response()->json(['success' => false, 'message' => 'Categoria Vinculada à um produto, não é possível excluir!']);
        }
        $this->find($id);
        return response()->json(['success' => true, 'message' => 'Usuario excluido com sucesso!']);
    }

    public function buildList(): JsonResponse
    {
        $obj = new \stdClass();
        $obj->list = Categoria::selectRaw("id, name")->get();
        $obj->columns = Categoria::getColumns();
        return response()->json(['success' => count($obj->list)?true:false, 'data' => $obj]);
    }

}
