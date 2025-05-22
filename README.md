# 🛡️ JWT ToDo List API

## Dependências

Este projeto utiliza o PostgreSQL rodando em um container Docker. Certifique-se de ter o Docker e o Docker Compose instalados.

Para subir o banco de dados, execute o seguinte comando na raiz do projeto:

```bash
docker compose up -d
```

> Uma API RESTful para gerenciamento de tarefas (posts) com autenticação via JWT, construída com Node.js, TypeScript, Prisma e boas práticas de Clean Code.

## 📑 Índice

- [📚 Sobre o Projeto](#-sobre-o-projeto)
- [🧰 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📁 Estrutura de Pastas](#-estrutura-de-pastas)
- [🚀 Executando Localmente](#-executando-localmente)
- [🧪 Scripts Disponíveis](#-scripts-disponíveis)
- [📦 Variáveis de Ambiente](#-variáveis-de-ambiente)
- [🔐 Autenticação JWT](#-autenticação-jwt)
- [🧭 Endpoints da API](#-endpoints-da-api)
- [🧠 Boas Práticas Aplicadas](#-boas-práticas-aplicadas)
- [🛠️ TODO / Melhorias Futuras](#️-todo--melhorias-futuras)
- [📫 Contato](#-contato)

---

## 📚 Sobre o Projeto

Este projeto é uma API simples de To-Do List que implementa autenticação via JWT. O principal objetivo é demonstrar o uso de boas práticas como Clean Architecture, separação de responsabilidades, uso de DTOs, serviços, repositórios, middlewares e validações com Prisma e Express.

---

## 🧰 Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL**
- **JWT (jsonwebtoken)**
- **Nodemon**
- **ESLint + Prettier**
- **dotenv**
- **ts-node**

---

## 📁 Estrutura de Pastas

```bash
src/
├── DTO/                  # Objetos de transferência de dados (camada de entrada)
├── env/                  # Configurações de variáveis de ambiente
├── errors/               # Tipos de erro personalizados
├── generated/            # Prisma Client gerado
├── http/
│   ├── controllers/      # Lógica dos controladores (Posts, Users)
│   ├── login/            # Endpoint de login
│   ├── middlewares/      # Middleware de autenticação JWT
│   └── routes/           # Rotas da API
├── interfaces/           # Tipagens para payloads
├── repositories/         # Repositórios (acesso ao banco de dados)
├── services/             # Regras de negócio (use-cases)
├── validators/           # Validações com Prisma
└── server.ts             # Ponto de entrada da aplicação
```

---

## 🚀 Executando Localmente

1. **Clone o repositório**

```bash
git clone https://github.com/rafaelcitario/JWT-ToDo-List
cd JWT-ToDo-List/server
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure o arquivo `.env`**

Crie um arquivo `.env` na raiz com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://postgres:example@localhost:5432/mydb?schema=public"
JWT_SECRET_KEY="sua_chave_secreta"
```

4. **Execute as migrações e gere o Prisma Client**

```bash
npm run prisma:migrate
npm run prisma:generate
```

5. **Inicie o servidor em modo desenvolvimento**

```bash
npm run server:watch
```

> A API estará disponível em: `http://localhost:3333`

---

## 🧪 Scripts Disponíveis

| Comando                 | Descrição                         |
|------------------------|-----------------------------------|
| `npm start`            | Inicia o servidor (`server.ts`)  |
| `npm run server:watch` | Inicia com `nodemon`             |
| `npm run lint`         | Roda o ESLint                    |
| `npm run lint:fix`     | Corrige automaticamente os erros |
| `npm run prisma:generate` | Gera o Prisma Client         |
| `npm run prisma:migrate`  | Executa as migrações          |

---

## 📦 Variáveis de Ambiente

- `DATABASE_URL` → URL de conexão com banco PostgreSQL
- `JWT_SECRET_KEY` → Chave secreta para assinar/verificar tokens JWT

---

## 🔐 Autenticação JWT

A autenticação é feita via token JWT no header `Authorization`.  
Formato:

```
Authorization: Bearer <token>
```

Rotas protegidas:
- `GET /pub`
- `POST /pub/create`

---

## 🧭 Endpoints da API

### 🔐 **POST /login**
Autentica o usuário e retorna um JWT.

**Payload:**

```json
{
  "username": "email@exemplo.com",
  "password": "senha123"
}
```

---

### 🧍 **POST /register**
Cria um novo usuário.

**Payload:**

```json
{
  "name": "Rafael Citario",
  "username": "contato.rafaelgomes@outlook.com",
  "password": "minhaSenhaSegura123"
}
```

---

### 📃 **GET /pub**
Retorna todos os posts (requer token JWT).

---

### ✍️ **POST /pub/create**
Cria um novo post (requer token JWT).

**Payload:**

```json
{
  "content": "Hoje aprendi sobre autenticação com JWT!"
}
```

---

## 🧠 Boas Práticas Aplicadas

- ✅ Separação por camadas (DTO, controller, service, repository)
- ✅ Tipagem com interfaces e TypeScript
- ✅ Middleware de autenticação
- ✅ Uso de Prisma ORM com PostgreSQL
- ✅ Arquitetura limpa e modular
- ✅ Documentação OpenAPI integrada

---

## 🛠️ TODO / Melhorias Futuras

- [ ] Implementar testes automatizados com Jest
- [ ] Adicionar paginação nos posts
- [ ] Criar painel front-end com React ou Svelte
- [ ] Adicionar logs com Winston/Pino
- [ ] Deploy em servidor ou vercel/railway

---

## 📫 Contato

**Rafael Citario**  
📧 [contato.rafaelgomes@outlook.com](mailto:contato.rafaelgomes@outlook.com)  
🔗 [LinkedIn](https://linkedin.com/in/rafaelcitario)  
💻 [GitHub](https://github.com/rafaelcitario/JWT-ToDo-List)

---

> _“Simples, direto, seguro — como uma boa API deve ser.”_
