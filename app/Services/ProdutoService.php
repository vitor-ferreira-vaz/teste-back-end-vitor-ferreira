<?php

namespace App\Services;
use App\Contracts\Repositories\ProdutoRepositoryInterface;

class ProdutoService
{
    public function __construct(Protected ProdutoRepositoryInterface $repository)
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
        return $this->repository->create($request);
    }
    public function update($id, $request)
    {
        return $this->repository->update($id, $request);
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
