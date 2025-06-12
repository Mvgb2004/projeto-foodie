# Projeto Foodie

## Visão Geral

O projeto **Foodie** é uma aplicação completa com backend em Node.js utilizando Express e Prisma ORM, e frontend mobile utilizando React Native com Expo. O objetivo principal é fornecer uma plataforma intuitiva para pedido de alimentos e gerenciamento de usuários.

## Funcionalidades

### Backend

* Autenticação e autorização de usuários.
* CRUD de pratos com banco de dados persistente.
* Validação e segurança dos dados através de middlewares.
* Gerenciamento eficiente das consultas usando Prisma ORM.

### Mobile

* Autenticação de usuários.
* Listagem e detalhes dos pratos disponíveis.
* Gerenciamento do carrinho de compras.
* Cadastro e gerenciamento do endereço do usuário.

## Pré-requisitos

* Node.js (18.x ou superior)
* npm (9.x ou superior)
* Docker Compose (para banco de dados)
* Expo CLI instalado globalmente (`npm install -g expo-cli`)

## Como Executar

### Backend

1. Clone o repositório:

```bash
git clone https://github.com/Mvgb2004/projeto-foodie.git
cd projeto-foodie/backend
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o banco de dados usando Docker Compose:

```bash
docker compose up -d
```

4. Execute as migrações do Prisma:

```bash
npx prisma migrate deploy
```

5. Seed inicial dos pratos:

```bash
npx prisma db seed
```

6. Inicie o servidor:

```bash
npm run dev
```

### Mobile

1. Navegue até o diretório do app mobile:

```bash
cd ../mobile
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o app mobile usando Expo:

```bash
expo start
```

4. Abra no emulador ou no celular físico via Expo Go.

## Estrutura do Projeto

### Backend

```
backend/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed-dishes.js
└── src/
    ├── app.ts
    ├── modules/
    │   ├── auth
    │   └── dishes
    ├── routes/
    └── server.ts
```

### Mobile

```
mobile/
├── app/
│   ├── _layout.tsx
│   └── (main)
├── assets/
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── screens/
│   └── types/
```

## Contribuição

* Crie uma branch com o nome da funcionalidade (`git checkout -b feature/minha-funcionalidade`).
* Faça suas alterações e commit (`git commit -am 'Adicionar minha funcionalidade'`).
* Envie para o repositório remoto (`git push origin feature/minha-funcionalidade`).
* Abra uma Pull Request detalhando as modificações.
