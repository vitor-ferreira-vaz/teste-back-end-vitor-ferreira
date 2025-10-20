<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProdutoFormRquest;
use App\Services\ProdutoService;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    public function __construct(Protected ProdutoService $service)
    {
    }
    public function All()
    {
        return $this->service->all();
    }
    public function Find($id)
    {
        return $this->service->find($id);
    }
    public function Insert(ProdutoFormRquest $request)
    {
        return $this->service->create($request->all());
    }
    public function Update($id, ProdutoFormRquest $request)
    {
        return $this->service->update($id, $request->all());
    }
    public function Delete($id)
    {
        return $this->service->delete($id);
    }
    public function BuildList()
    {
        return $this->service->buildList();
    }
}
