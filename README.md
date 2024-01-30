# Teste prático para Back-End 
***

Bem-vindo.

Este é personalizado, usarei para avaliar tecnicamente todas as pessoas que estão participando do nosso processo seletivo para a vaga de desenvolvimento Back-End, lembrando que a aplicação de patterns como service e repository e processamento de filas asyncronas com horizon fazem diferença comente o seu código para facilitar a revisão o prazo de execução é até sexta as 15 horas, se tiver alguma duvida pergunte.

## TL;DR

- Você deverá criar um CRUD através de uma API REST com Laravel;
- Você deverá criar um comando artisan que se comunicará com uma outra API para importar em seu banco de dados;

## Começando

**Faça um fork desse projeto para iniciar o desenvolvimento. PRs não serão aceitos.**

### Configuração do ambiente

**Setup laravel conforme a documentação pode usar qualquer opção usando 'Valet, artisan serve ou docker'.**

### Funcionalidades a serem implementadas

**Essa aplicação deverá se comportar como uma API REST, onde será consumida por outros sistemas. Nesse teste você deverá se preocupar em constriuir somente a API**. 

##### CRUD produtos

Aqui você deverá desenvolver as principais operações para o gerenciamento de um catálogo de produtos, sendo elas:

- Criação
- Atualização
- Exclusão

O produto deve ter a seguinte estrutura:

Campo       | Tipo      | Obrigatório   | Pode se repetir
----------- | :------:  | :------:      | :------:
id          | int       | true          | false
name        | string    | true          | false        
price       | float     | true          | true
decription  | text      | true          | true
category    | string    | true          | true
image_url   | url       | false         | true

Os endpoints de criação e atualização devem seguir o seguinte formato de payload:

```json
{
    "name": "product name",
    "price": 109.95,
    "description": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    "category": "test",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
}
```

**Importante:** Tanto os endpoints de criação é atualização, deverão ter uma camada de validação dos campos.

##### Buscas de produtos

Para realizar a manutenção de um catálogo de produtos é necessário que o sistema tenha algumas buscas, sendo elas:

- Busca pelos campos `name` e `category` (trazer resultados que batem com ambos os campos).
- Busca por uma categoria específica.
- Busca de produtos com e sem imagem.
- Buscar um produto pelo seu ID único.

##### Importação de produtos de uma API externa

É necessário que o sistema seja capaz de importar produtos que estão em um outro serviço. Deverá ser criado um comando que buscará produtos nessa API e armazenará os resultados para a sua base de dados. 

Sugestão: `php artisan products:import`

Esse comando deverá ter uma opção de importar um único produto da API externa, que será encontrado através de um ID externo.

Sugestão: `php artisan products:import --id=123`

Utilize a seguinte API para importar os produtos: [https://fakestoreapi.com/docs](https://fakestoreapi.com/docs)

---

Se houver dúvidas, por favor, abra uma issue nesse repositório.
