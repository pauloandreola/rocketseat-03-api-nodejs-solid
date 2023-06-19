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
