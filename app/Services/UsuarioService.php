<?php

namespace App\Services;
use App\Contracts\Repositories\UsuarioRepositoryInterface;

class UsuarioService
{
    public function __construct(Protected UsuarioRepositoryInterface $repository)
    {
    }
    public function All()
    {
        return $this->repository->all();
    }
    public function Find($id)
    {
        return $this->repository->find($id);
    }
    public function create($request)
    {
        return $this->repository->create($request->all());
    }
    public function update($id, $request)
    {
        return $this->repository->update($id, $request->all());
    }
    public function Delete($id)
    {
        return $this->repository->delete($id);
    }
    public function BuildList()
    {
        return $this->repository->buildList();
    }

}
