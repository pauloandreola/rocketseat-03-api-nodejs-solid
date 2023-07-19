# rocketseat-03-api-nodejs-solid

# App

GymPass style app.

## RF's (Requisitos Funcionais)

- [ X ] - Deve ser possível se cadastrar;
- [ X ] - Deve ser possível se autenticar;
- [ X ] - Deve ser possível obter o perfil de um usuário logado;
- [ X ] - Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ X ] - Deve ser possível o usuário obter o seu histórico de check-ins;
- [ X ] - Deve ser possível o usuário buscar uma academias próximas (até 10Km);
- [ X ] - Deve ser possível o usuário buscar uma academia pelo nome;
- [ X ] - Deve ser possível o usuário realizar check-in em uma academia;
- [ X ] - Deve ser possível validar o check-in de um usuário;
- [ X ] - Deve ser possível cadastrar uma academia;

## RN's (Regras de Negócio)

- [ X ] - O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ X ] - O usuário não pode fazer check-in no mesmo dia;
- [ X ] - O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [  ] - O check-in só pode ser validado 20 minutos após criado;
- [  ] - O check-in só pode ser validado por administradores;
- [  ] - A academia só pode ser cadastrada por administradores; 


## RNF's (Requisitos não Funcionais )

- [ X ] - A senha do usuário precisa estar criptografada;
- [ X ] - Os dados da aplicação precisam estar persistido em um banco PostgresSQL;
- [ X ] - Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [  ] - O usuário deve ser identificado por um JWT (JSON Web Token); 
