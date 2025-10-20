<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoriaFormRquest;
use App\Services\CategoriaService;

class CategoriaController extends Controller
{
    public function __construct(protected CategoriaService $service)
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

    public function Insert(CategoriaFormRquest $request)
    {
        return $this->service->create($request->all());
    }

    public function Update($id, CategoriaFormRquest $request)
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
