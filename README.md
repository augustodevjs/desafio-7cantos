## Front End

<h1><img width="100%" src="./frontend/libs/shared/assets/src/images/lists-todo.png"></h1>
<h1><img width="100%" src="./frontend/libs/shared/assets/src/images/add-lists.png"></h1>
<h1><img width="100%" src="./frontend/libs/shared/assets/src/images/edit-tasks.png"></h1>
<h1><img width="100%" src="./frontend/libs/shared/assets/src/images/delete-tasks.png"></h1>
<h1><img width="100%" src="./frontend/libs/shared/assets/src/images/status-lists.png"></h1>
<h1><img width="100%" src="./frontend/libs/shared/assets/src/images/not-found.png"></h1>
<hr>
<br>

## Back End

<h1><img width="100%" src="./frontend/libs/shared/assets/src/images/tasks-api-swagger.png"></h1>
<h1><img width="100%" src="./frontend/libs/shared/assets/src/images/xamp.png"></h1>
<h1><img width="100%" src="./frontend/libs/shared/assets/src/images/phpadmin.png"></h1>

## Como rodar o projeto

```bash
# Faça o clone do projeto
$ git clone https://github.com/augustodevjs/desafio-7cantos

# Configuração do Backend
  1 - entre no diretório -- cd ./backend
  2 - baixe o xamp - https://www.apachefriends.org
  3 - baixe o composer - https://getcomposer.org
  4 - rode o apache e o mysql na porta 3305 para não ocorrer um erro por conta do .env
  5 - crie uma database chamada todo
  6 - crie um arquivo .env e copie os dados do .env.example
  7 - rode as migrations -- php artisan migrate
  8 - rode o projeto -- php artisan serve
  9 - entra nessa url para visualizar a documentação do swagger -- http://127.0.0.1:8000/api/documentation

# Configuração do Front End
  1 - entre no diretório -- cd ./frontend
  2 - instale as dependências do projeto -- yarn install
  3 - crie um arquivo .env e copie os dados do .env.example para esse arquivo
  4 - caso queira vê as dependências de cada lib feito pelo nx worskpace rode -- npx nx graph
  5 - rode o projeto -- yarn start
```
