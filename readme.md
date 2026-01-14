# XD Plans - Blog API (Headless)

**Desenvolvedor:** David Xavier  
**Projeto:** XD Plans (Sites, Lojas Virtuais e Apps)  
**Ano:** 2026

Backend REST completo para blog headless da XD Plans, desenvolvido com Node.js + Express + MongoDB. Pronto para servir conteúdo para aplicações React Native e sites React/Next.js.

## 📋 Sobre a XD Plans

A XD Plans é especializada em criação de sites, lojas virtuais e aplicativos mobile. Esta API serve como backend headless para o blog da empresa, permitindo gerenciamento de conteúdo e consumo via endpoints REST.

## 🚀 Tecnologias

- **Node.js** 18+
- **Express** - Framework web
- **MongoDB** + **Mongoose** - Banco de dados
- **JWT** - Autenticação admin
- **bcrypt** - Hash de senhas
- **Zod** - Validação de dados
- **Helmet** - Segurança HTTP
- **CORS** - Cross-Origin Resource Sharing
- **express-rate-limit** - Rate limiting

## 📁 Estrutura do Projeto

```
xdblogapi/
├── src/
│   ├── server.js           # Entry point
│   ├── app.js              # Configuração Express
│   ├── config/
│   │   ├── db.js           # Conexão MongoDB
│   │   └── env.js          # Variáveis de ambiente
│   ├── models/
│   │   ├── Post.js         # Modelo de Post
│   │   └── User.js         # Modelo de User (Admin)
│   ├── controllers/
│   │   ├── postController.js
│   │   ├── authController.js
│   │   └── categoryController.js
│   ├── routes/
│   │   ├── public.js       # Rotas públicas
│   │   ├── admin.js        # Rotas admin (JWT)
│   │   └── auth.js         # Autenticação
│   ├── middlewares/
│   │   ├── auth.js         # JWT authentication
│   │   └── errorHandler.js # Error handling
│   ├── validators/
│   │   ├── post.js         # Validação posts (Zod)
│   │   └── auth.js         # Validação auth (Zod)
│   ├── services/
│   │   └── seed.js         # Seed de posts
│   └── utils/
│       └── slug.js         # Geração de slugs
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+ instalado
- MongoDB (local ou MongoDB Atlas)
- npm ou yarn

### Passo a Passo

1. **Clone o repositório** (ou baixe os arquivos)

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   
   Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Edite o `.env` com suas configurações:
   ```env
   MONGODB_URI=mongodb://localhost:27017/xdblog
   JWT_SECRET=seu-jwt-secret-super-seguro-aqui
   ADMIN_EMAIL=admin@xdplans.com
   ADMIN_PASSWORD=admin123
   PORT=3000
   NODE_ENV=development
   CORS_ORIGIN=*
   ```

4. **Inicie o servidor:**
   
   Desenvolvimento (com nodemon):
   ```bash
   npm run dev
   ```
   
   Produção:
   ```bash
   npm start
   ```

5. **Execute o seed (opcional):**
   
   O seed cria um usuário admin e ~30 posts de exemplo:
   ```bash
   npm run seed
   ```
   
   Ou via endpoint (após fazer login):
   ```bash
   POST /admin/seed
   ```

## 🗄️ Configuração MongoDB Atlas

1. Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie uma conta gratuita
3. Crie um novo cluster (Free tier disponível)
4. Configure acesso de rede (adicione `0.0.0.0/0` para permitir qualquer IP)
5. Crie um usuário de banco de dados
6. Copie a connection string
7. Substitua `<password>` e `<dbname>` na string:
   ```
   mongodb+srv://usuario:senha@cluster.mongodb.net/xdblog?retryWrites=true&w=majority
   ```
8. Cole no `.env` como `MONGODB_URI`

## 📡 Endpoints da API

### Base URL
```
http://localhost:3000
```

### Públicos

#### `GET /health`
Verifica status da API.

**Resposta:**
```json
{
  "success": true,
  "name": "XD Plans Blog API",
  "developer": "David Xavier",
  "company": "XD Plans",
  "status": "online",
  "timestamp": "2026-01-15T10:30:00.000Z"
}
```

#### `GET /posts`
Lista posts publicados com filtros e paginação.

**Query Parameters:**
- `q` (string) - Busca por texto
- `category` (string) - Filtrar por categoria
- `tag` (string) - Filtrar por tag
- `page` (number) - Página (padrão: 1)
- `limit` (number) - Itens por página (padrão: 10)
- `sort` (string) - Ordenação (padrão: `-publishedAt`)
- `status` (string) - Status do post (padrão: `published`)

**Exemplo:**
```bash
curl "http://localhost:3000/posts?page=1&limit=10&category=Engenharia"
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "Como Criar um Site Profissional",
      "slug": "como-criar-um-site-profissional",
      "excerpt": "...",
      "category": "Engenharia",
      "tags": ["web", "desenvolvimento"],
      "coverImage": "blog_cover_1.jpg",
      "status": "published",
      "publishedAt": "2026-01-15T00:00:00.000Z",
      "createdAt": "2026-01-15T00:00:00.000Z",
      "updatedAt": "2026-01-15T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 30,
    "pages": 3
  }
}
```

#### `GET /posts/:slug`
Busca um post específico por slug.

**Exemplo:**
```bash
curl "http://localhost:3000/posts/como-criar-um-site-profissional"
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Como Criar um Site Profissional",
    "slug": "como-criar-um-site-profissional",
    "excerpt": "...",
    "content": "# Conteúdo em markdown...",
    "category": "Engenharia",
    "tags": ["web", "desenvolvimento"],
    "coverImage": "blog_cover_1.jpg",
    "status": "published",
    "publishedAt": "2026-01-15T00:00:00.000Z",
    "createdAt": "2026-01-15T00:00:00.000Z",
    "updatedAt": "2026-01-15T00:00:00.000Z"
  }
}
```

#### `GET /categories`
Lista todas as categorias com contagem de posts.

**Exemplo:**
```bash
curl "http://localhost:3000/categories"
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    { "name": "Engenharia", "count": 8 },
    { "name": "E-commerce", "count": 5 },
    { "name": "Design", "count": 4 },
    { "name": "SEO", "count": 2 }
  ]
}
```

### Autenticação

#### `POST /auth/login`
Autentica admin e retorna JWT token.

**Body:**
```json
{
  "email": "admin@xdplans.com",
  "password": "admin123"
}
```

**Exemplo:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@xdplans.com","password":"admin123"}'
```

**Resposta:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "admin@xdplans.com",
    "role": "admin"
  }
}
```

**Rate Limit:** 5 tentativas a cada 15 minutos

### Admin (Requer JWT)

Todas as rotas admin requerem header de autenticação:
```
Authorization: Bearer <token>
```

#### `POST /admin/posts`
Cria um novo post.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Novo Post",
  "excerpt": "Resumo do post",
  "content": "# Conteúdo em markdown...",
  "category": "Engenharia",
  "tags": ["tag1", "tag2"],
  "coverImage": "blog_cover_1.jpg",
  "status": "published",
  "publishedAt": "2026-01-15T00:00:00.000Z"
}
```

**Exemplo:**
```bash
curl -X POST http://localhost:3000/admin/posts \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Novo Post",
    "excerpt": "Resumo",
    "content": "# Conteúdo...",
    "category": "Engenharia",
    "tags": ["web"],
    "status": "published"
  }'
```

#### `PUT /admin/posts/:id`
Atualiza um post existente.

**Exemplo:**
```bash
curl -X PUT http://localhost:3000/admin/posts/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title": "Título Atualizado"}'
```

#### `DELETE /admin/posts/:id`
Arquiva um post (soft delete - muda status para `archived`).

**Exemplo:**
```bash
curl -X DELETE http://localhost:3000/admin/posts/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer <token>"
```

#### `POST /admin/seed`
Executa seed de posts (cria admin se não existir e insere ~30 posts).

**Exemplo:**
```bash
curl -X POST http://localhost:3000/admin/seed \
  -H "Authorization: Bearer <token>"
```

## 🚀 Deploy no Render

### Passo a Passo

1. **Crie uma conta no [Render](https://render.com)** (plano gratuito disponível)

2. **Crie um novo Web Service:**
   - Conecte seu repositório GitHub/GitLab
   - Ou faça deploy manual via CLI

3. **Configure o Build:**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

4. **Configure as Variáveis de Ambiente:**
   
   No painel do Render, adicione:
   ```
   MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/xdblog?retryWrites=true&w=majority
   JWT_SECRET=seu-jwt-secret-super-seguro-aqui-aleatorio
   ADMIN_EMAIL=admin@xdplans.com
   ADMIN_PASSWORD=sua-senha-segura-aqui
   NODE_ENV=production
   CORS_ORIGIN=https://seusite.com,https://app.seusite.com
   PORT=10000
   ```
   
   **Importante:**
   - Use um `JWT_SECRET` forte e aleatório
   - Use senha forte para `ADMIN_PASSWORD`
   - Configure `CORS_ORIGIN` com seus domínios (separados por vírgula)
   - Render define `PORT` automaticamente, mas você pode usar `10000` como padrão

5. **Deploy:**
   - Render fará build e deploy automaticamente
   - Acompanhe os logs no painel
   - A URL será algo como: `https://xdblogapi.onrender.com`

6. **Teste o Deploy:**
   ```bash
   curl https://xdblogapi.onrender.com/health
   ```

### Dicas para Render

- **Free Tier:** Pode "adormecer" após inatividade. Primeira requisição pode demorar ~30s
- **MongoDB Atlas:** Use o plano gratuito (M0) que é suficiente para começar
- **Health Check:** Render usa `/health` automaticamente
- **Logs:** Acompanhe logs no painel do Render

## 📊 Modelos de Dados

### Post

```javascript
{
  title: String (obrigatório, 3-200 chars),
  slug: String (único, gerado automaticamente),
  excerpt: String (obrigatório, 10-500 chars),
  content: String (obrigatório, markdown),
  category: String (obrigatório),
  tags: [String],
  coverImage: String,
  status: "draft" | "published" | "archived",
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Índices:**
- `slug` (único)
- `status + publishedAt`
- `category`
- `tags`
- Text index em `title + excerpt + content`

### User (Admin)

```javascript
{
  email: String (único, obrigatório),
  passwordHash: String (obrigatório),
  role: "admin",
  createdAt: Date,
  updatedAt: Date
}
```

## 🌱 Seed de Posts

O seed cria:
- **1 usuário admin** (se não existir)
- **~30 posts** sobre temas da XD Plans:
  - Engenharia (Next.js, React, APIs, etc.)
  - E-commerce (Lojas virtuais, pagamentos, frete)
  - Design (UX/UI, acessibilidade, dark mode)
  - SEO (Otimização, técnicas)
  - Apps (React Native, PWA)
  - Performance (Otimização web)
  - Segurança (Boas práticas)
  - Negócios (Briefing, conversão)
  - Manutenção (Monitoramento, hospedagem)

**Categorias incluídas:**
- Engenharia
- Novidades
- Design
- SEO
- E-commerce
- Apps
- Performance
- Segurança
- Negócios
- Manutenção

## 🧪 Testes Rápidos

### 1. Verificar saúde da API:
```bash
curl http://localhost:3000/health
```

### 2. Listar posts:
```bash
curl http://localhost:3000/posts
```

### 3. Fazer login:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@xdplans.com","password":"admin123"}'
```

### 4. Criar post (após login):
```bash
# Substitua <token> pelo token recebido no login
curl -X POST http://localhost:3000/admin/posts \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meu Primeiro Post",
    "excerpt": "Este é um post de teste",
    "content": "# Título\\n\\nConteúdo do post aqui...",
    "category": "Engenharia",
    "tags": ["teste"],
    "status": "published"
  }'
```

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor em modo desenvolvimento (nodemon)
- `npm start` - Inicia servidor em produção
- `npm run seed` - Executa seed de posts (via script)

## 🔒 Segurança

- **Helmet** - Headers de segurança HTTP
- **CORS** - Configurável por ambiente
- **JWT** - Autenticação stateless
- **bcrypt** - Hash de senhas
- **Rate Limiting** - Proteção contra brute force no login
- **Validação** - Zod para validação de dados
- **Error Handling** - Tratamento centralizado de erros

## 📚 Recursos Adicionais

- **MongoDB Atlas:** [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- **Render:** [https://render.com](https://render.com)
- **Express:** [https://expressjs.com](https://expressjs.com)
- **Mongoose:** [https://mongoosejs.com](https://mongoosejs.com)

## 📄 Licença

ISC

## 👤 Autor

**David Xavier**  
Desenvolvedor Backend - XD Plans

---

**XD Plans** - Sites, Lojas Virtuais e Apps
