<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Categoria extends Authenticatable
{
   /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'name',
    ];

    protected $table = 'categoria';

    public static function getColumns() {
        return  [
            ['title' => 'Cód', 'name' => 'id', 'type' => 'number'],
            ['title' => 'Nome', 'name' => 'name', 'type' => 'text'],
        ];
    }

}
