<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Produto extends Authenticatable
{
   /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'name',
        'price',
//        'category_id',
        'description',
        'image_url',
    ];

    protected $table = 'produto';


    public static function getColumns() {
       return  [
           ['title' => 'Cód', 'name' => 'id', 'type' => 'number'],
           ['title' => 'Produto', 'name' => 'name', 'type' => 'text'],
           ['title' => 'Descrição', 'name' => 'description', 'type' => 'text'],
           ['title' => 'Imagem (url)', 'name' => 'image_url', 'type' => 'select'],
        ];
    }

}
