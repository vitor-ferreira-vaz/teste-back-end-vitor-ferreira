<?php

namespace App\Repositories;

use App\Contracts\Repositories\ProdutoRepositoryInterface;
use App\Contracts\Repositories\UsuarioRepositoryInterface;
use App\Models\Produto;
use App\Models\ProdutoCategoria;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ProdutoRepository implements ProdutoRepositoryInterface
{
    public function all()
    {
        return Produto::all();
    }

    public function find(int $id): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => Produto::find($id)
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
            Produto::create($data);
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
            Produto::find($id)->update($data);
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
        ProdutoCategoria::whereRaw("produto_id = $id")->delete();
        Produto::destroy($id);
        return response()->json([
            'success' => true,
            'message' => 'Usuario excluido com sucesso!'
        ]);
    }

    public function buildList(): JsonResponse
    {
        $obj = new \stdClass();
        $obj->list = Produto::selectRaw("id, name, price, description, image_url")->get();
        $obj->columns = Produto::getColumns();
        return response()->json(['success' => count($obj->list)?true:false, 'data' => $obj]);
    }

}
