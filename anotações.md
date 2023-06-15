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

