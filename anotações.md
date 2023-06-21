Obs. npx é um atalho para executar scripts que existem na pasta .bin dentro de node_modules

npm init -y
pasta src
criar arquivo server.ts
npm i typescript -D
npm i @types/node -D
npm i tsx -D (Para executar o código em desenvolvimento. Ele transforma o código de Typescript para Javascript)
npm tsup -D (Para build, antes de colocar em produção converter para Javascript)
npx tsc --init
npm i fastify
criar os scripts:
    "start:dev": "tsx watch src/server.ts", (rodar o projeto em desenvolvimento, a cada alteração ele reinicia o projeto)
    "start": "node build/server.js", (roda o projeto já na linguagem Javascript após ser criado pelo tsup)
    "build": "tsup src --out-dir build" (busca todo o código do projeto que está dentro da pasta src e cria uma pasta dist com o código em Javascript)
criar arquivo .npmrc e inserir save-exact=true para manter as versões das bibliotecas sem atualizações de versões... rodar novamente a instalação das bibliotecas. Para identificar que as verões não serão alteradas as versões não devem ter ^ ou ~.
Obs. Preferencialmente sempre salvar as versões exatas das bibliotecas no package.json.
npm i dotenv
npm i zod
npm i eslint @rocketseat/eslint-config -D (formato padrão de configuração da rocketseat)
ORM - Object Relational Mapper - Prisma, Knex, TypeORM, Sequelize, etc.
npm i prisma -D
** npx prisma init (Para inicializar a parte de banco de dados na aplicação/conexão com o banco de dados)
Verificar se tem a extensão do Prisma instalado no VSCode
Obs. Dentro de settings.json - CTRL+SHIFT+P - no VSCode incluir ....
    "[prisma]": {
        "editor.formatOnSave": true
    },
** npx prisma generate (Criar de forma automatizada a tipagem do schema, ou seja, a integração do typescript para que o código entenda que exista uma tabela com os campos definidos no schema.prisma)
** npm i @prisma/client (Esse é uma dependência de produção, será necessário para acessar o banco de dados)
O prisma cria automaticamente dentro do arquivo .env na raiz do projeto uma conexão padrão:
 "DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public", onde devo alterar .... johndoe:randompassword, para,
 POSTGRESQL_USERNAME:POSTGRESQL_PASSWORD, ou seja,
 docker:docker, e o campo,
 mydb, para,
 DATABASE, ou seja,
 apisolid, portanto, vai ficar assim.....
 "DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"
------------- CONFIGURAÇÃO DO DOCKER ------------------ 
Link para baixar o docker.... https://docs.docker.com/get-docker/
Nesse projeto utilizar a imagem da Bitnami do PostgreSQL - https://hub.docker.com/r/bitnami/postgresql
comando para instalar uma imagem direto no terminal configurado conforme segue abaixo:
docker run --name api-nodejs-solid -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
informações do comando acima:
- Nome do container: api-nodejs-solid
- username de acesso ao banco postgresql: docker
- password de acesso ao banco postgresql: docker
- nome do banco de dados criado dentro do postgresql: apisolid
- porta de conexão externa e interna: 5432
- versão da imagem a ser instalada no docker: bitnami/postgresql (é o postgresql da bitnami)
comando para instalar direto do terminal uma imagem default sem nenhuma configuração - docker pull bitnami/postgresql
CTRL+C para parar o container... como na primeira vez não funcionou no meu terminal, parei via docker desktop.
docker ps (para listar os container que estão rodando)
docker ps -a (para listar todos os containers que já foram criados, rodando ou parados)
para rodar novamente o container, utilizar o comando docker start com o ID, ou o nome do container, exemplo:
docker start b1f90b41a687, ou docker start api-nodejs-solid
para parar novamente o container, utilizar o comando docker stop com o ID, ou o nome do container, exemplo:
docker stop b1f90b41a687, ou docker stop api-nodejs-solid
para remover o container, utilizar o comando docker rm com o ID, ou o nome do container, exemplo:
docker rm b1f90b41a687, ou docker rm api-nodejs-solid
para ver os logs, utilizar o comando docker logs com o ID, ou o nome do container, exemplo:
docker logs b1f90b41a687, ou docker logs api-nodejs-solid
------------- FIM DA CONFIGURAÇÃO DO DOCKER ------------------ 
npx prisma migrate dev
Prisma vai solicitar um nome para essa migration
Obs. Se o comando gerar esse erro: "Error: P1000: Authentication failed against database server at `localhost`, the provided database credentials for `docker` are not valid."
Entrar no gerenciamento de serviços do windows e desabilitar a inicialização do Postgresql que deve estar habilitada.
Esse comando acima vai rodar o schema.prisma, ver todas as tabelas, ou campos existentes e que ainda não foram refletidas no banco de dados, ou seja, incluídas/adicionadas, excluídas/removidas, atualizadas/alteradas, ou até mesmo criadas. 
Quando roda o comando ele pede um nome para a migration, descrever o que deve ser criado nessa migration para que se tenha o histórico das inclusões, exclusões, atualizações, criações, etc.
Nessa migration teremos as informações da timestamp e a descrição inserida no momento da criação. Isso para termos um controle de versão.
npx prisma studio (Comando para abrir no navegador uma interface para navegar as tabelas do banco de dados)
--------------- INSTALAR DOCKER COM ARQUIVO COMPOSE
criar o arquivo docker-compose.yml na raiz do projeto
version: '3'

services:
  api-nodejs-solid:
    image: bitnami/postgresql
    ports:
      - 5432:5432
    environment:
      - POSTGRESQL_USERNAME=docker
      - POSTGRESQL_PASSWORD=docker
      - POSTGRESQL_DATABASE=apisolid
docker compose up -d (rodar o docker compose que cria um banco de dados em background/segundo plano sem mostrar os logs de criação)
docker compose up (rodar o docker compose que cria um banco de dados mostrando os logs de criação)
docker compose stop (somente parar de executar o container no docker)
docker compose down (parar e deletar/remover o container criado no docker compose)
--------------- FIM INSTALAR DOCKER COM ARQUIVO COMPOSE

Relacionamento
1 para 1 - um registro de uma tabela pode ter acesso/se relacionar/interagir com um registro de outra tabela  
1 para N - um registro de uma tabela pode ter acesso/se relacionar/interagir com diversos registros de outra tabela Ex. Um usuário pode fazer diversos checkins
N para N - diversos registro de uma tabela podem ter acesso/se relacionar/interagir com diversos registros de outra tabela

npx prisma migrate dev (para gerar a migration e criar o banco de dados)

npm i bcryptjs (para criar hash da senha)
npm i -D @types/bcryptjs
npm vitest vite-tsconfig-paths -D