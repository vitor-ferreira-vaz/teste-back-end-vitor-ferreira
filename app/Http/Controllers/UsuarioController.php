<?php

namespace App\Http\Controllers;

use App\Http\Requests\UsuarioFormRquest;
use App\Services\UsuarioService;

class UsuarioController extends Controller
{
    public function __construct(Protected UsuarioService $service) {}

    public function All()
    {
        return $this->service->all();
    }
    public function Find($id)
    {
        return $this->service->find($id);
    }
    public function Insert(UsuarioFormRquest $request)
    {
        return $this->service->create($request->all());
    }
    public function Update($id, UsuarioFormRquest $request)
    {
        return $this->service->update($id, $request->all());
    }
    public function Delete($id)
    {
        return $this->service->delete($id);
    }
}
