# Teste prático para Back-End 
***

Bem-vindo.

Usarei esse teste para avaliar tecnicamente todas as pessoas que estão participando do nosso processo seletivo para a vaga de desenvolvedor full stack, lembrando que a aplicação de patterns como service e repository e processamento de filas assíncronas com horizon fazem diferença. O prazo de execução é de 3 dias corridos a partir do momento que o teste foi encaminhado para você, se tiver alguma duvida pergunte. O teste deve ter um read-me que explique o projeto e como rodá-lo.

## TL;DR

- Você deverá criar um comando artisan que se comunicará com uma outra API para importar em seu banco de dados;
- Você deverá criar o front-end do CRUD (Criação, Leitura, Atualização e Deleção) no sistema de gerenciamento de biblioteca. Você poderá escolher entre utilizar React ou Blade no front-end, junto com bibliotecas de estilização como Tailwind CSS ou Bootstrap.

## Começando

**Faça um fork desse projeto para iniciar o desenvolvimento. PRs não serão aceitos.**

### Configuração do ambiente

**Setup laravel conforme a documentação pode usar qualquer opção usando 'Valet, artisan serve ou docker'.**

### Funcionalidades a serem implementadas

Através da inteface o usuário deverá ser capaz de:
- Fazer login
- Editar dados pessoais (Email, nome, telefone, imagem de perfil...)
- Criar categorias
- Editar categorias
- Criar produtos
- Editar produtos
- Ter uma opção de migrar produtos bem como as categorias da API que será conectada (Requisito explicado logo abaixo).

#### CRUD produtos

Aqui você deverá desenvolver as principais operações para o gerenciamento de um catálogo de produtos, sendo elas:

- Criação
- Atualização
- Exclusão

**O produto pode ter até 3 categorias.**

O produto deve ter a seguinte estrutura:

Campo       | Tipo      | Obrigatório   | Pode se repetir
----------- | :------:  | :------:      | :------:
id          | int       | true          | false
name        | string    | true          | false        
price       | float     | true          | true
decription  | text      | true          | true
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

#### Buscas de produtos

Para realizar a manutenção de um catálogo de produtos é necessário que o sistema tenha algumas buscas, sendo elas:

- Busca pelos campos `name` e `category` (trazer resultados que batem com ambos os campos).
- Busca por uma categoria específica.
- Busca de produtos com e sem imagem.
- Buscar um produto pelo seu ID único.

#### Importação de produtos de uma API externa

É necessário que o sistema seja capaz de importar produtos que estão em um outro serviço. Deverá ser criado um comando que buscará produtos nessa API e armazenará os resultados para a sua base de dados. 

Sugestão: `php artisan products:import`

Esse comando deverá ter uma opção de importar um único produto da API externa, que será encontrado através de um ID externo.

Sugestão: `php artisan products:import --id=123`

Utilize a seguinte API para importar os produtos: [https://fakestoreapi.com/docs](https://fakestoreapi.com/docs)

---

Se houver dúvidas, por favor, abra uma issue nesse repositório.
---
---

O projeto consiste na Laravel Framework 10.49.1 sendo necessário ter instalado PHP 8.1>=.
A configuração necessária por parte do back-end consiste:
- `composer install/update`
- Configuração básica do .env
 ```json
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=seu_banco
DB_USERNAME=seu_ususario_mysql
DB_PASSWORD=sua_senha
 ```
- executar o comando php artisan key:generate
- `php artisa migrate`
- e por `php artisan serve` para uso em desenvolvimento

A configuração necessária por parte do back-end consiste:
- executar o comando `npm install`
- `npm run dev` para uso em desenvolvimento

