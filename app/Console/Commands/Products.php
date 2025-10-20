<?php

namespace App\Console\Commands;

//use App\Models\ImageProduct;
use App\Models\Categoria;
use App\Models\Produto;
use App\Models\ProdutoCategoria;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class Products extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'products:import {--id=0}? {--offline}?';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Importar produtos da FakeStoreAPI';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $prod_id = $this->input->getOption('id');
        $offline = $this->input->getOption('offline');

        $this->info("Requisição iniciada...");

        if (!isset($prod_id)) {
            $this->error("Nenhum produto encontrado!");
        }

        $record = !$offline ? (object)$this->getApiData($prod_id) : (object)$this->getDiskData($prod_id);

        if (Produto::find($prod_id) != null) {
            $this->error("Produto já importado!");
            exit;
        }


        \DB::BeginTransaction();
        try {
            $categoria = Categoria::whereRaw('name = ?', [$record->category])->first();
            $categoria = $categoria ?: Categoria::create(['name' => $record->category]);

            $produto = Produto::create([
                'id' => $prod_id,
                'name' => "$record->name",
                'price' => "$record->price",
                'category_id' => "$categoria->id",
                'description' => "$record->description",
                'image_url' => "$record->image",
            ]);

            ProdutoCategoria::create(['produto_id' => $produto->id, 'categoria_id' => $categoria->id]);

            DB::commit();
            $this->alert("Produtos importados com sucesso!");
        } catch (\Exception $e) {
            DB::rollBack();
            $this->error("Erro ao inserir os produtos inportados: " . $e->getMessage());
        }

    }

    private function getApiData(int $prod_id)
    {
        $response = Http::get("https://fakestoreapi.com/products/$prod_id");
        if ($response->clientError()) {
            return $this->error("Erro de requisição! status: 400!");
        } else if ($response->serverError()) {
            return $this->error("Erro do servidor! status: 500!");
        }

        if (!$response->object()) {
            return $this->error("ID não localizado na base de dados!");
        }
        return [
            "id" => $response->object()->id,
            "name" => $response->object()->title,
            "price" => $response->object()->price,
            "description" => $response->object()->description,
            "category" => $response->object()->category,
            "image" => $response->object()->image,
//            "rate" => $response->object()->rating->rate,
//            "count" => $response->object()->rating->count
        ];
    }

    private function getDiskData(int $prod_id)
    {
        $path = Storage::disk('products')->path('all_products.json');
        $json = file_get_contents($path);
        $response = json_decode(str_replace(["\r", "\n"], '', $json), true);

        if (!isset($response[$prod_id])) {
            $this->error("Produto com id $prod_id não econtrado!");
        }
        $response = (object)$response[$prod_id];
        return [
            "id" => $response->id,
            "title" => $response->title,
            "price" => $response->price,
            "description" => $response->description,
            "category" => $response->category,
            "image" => $response->image,
            "rate" => $response->rating['rate'],
            "count" => $response->rating['count']
        ];
    }


}
