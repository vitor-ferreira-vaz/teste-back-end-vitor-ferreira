<?php

namespace App\Providers;

use App\Contracts\Repositories\CategoriaRepositoryInterface;
use App\Contracts\Repositories\ProdutoRepositoryInterface;
use App\Repositories\CategoriaRepository;
use App\Repositories\ProdutoRepository;
use Illuminate\Support\ServiceProvider;
use App\Contracts\Repositories\UsuarioRepositoryInterface;
use App\Repositories\UsuarioRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(UsuarioRepositoryInterface::class, UsuarioRepository::class);
        $this->app->bind(ProdutoRepositoryInterface::class, ProdutoRepository::class);
        $this->app->bind(CategoriaRepositoryInterface::class, CategoriaRepository::class);
    }
}
