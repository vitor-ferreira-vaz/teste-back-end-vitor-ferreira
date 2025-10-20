<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produto', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->float('price');
//            $table->unsignedBigInteger('category_id');
            $table->text('description');
            $table->tinyInteger('is_obrigatorio')->default(0);
            $table->string('image_url');
            $table->timestamps();

//            $table->foreign('category_id', 'fk_categoria_x_produto')->references('id')->on('categoria');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produto');
    }
};
