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
- **Cloudinary** - Upload de imagens
- **Multer** - Processamento de arquivos

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

## 🖼️ Upload de Imagens (Cloudinary)

A API permite upload de imagens de capa para posts através do Cloudinary. O upload é seguro e não expõe credenciais do Cloudinary para o cliente.

### Configuração

Adicione as seguintes variáveis de ambiente ao seu `.env`:

```env
# Cloudinary - Upload de Imagens
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-api-secret
```

### Endpoint

**POST** `/admin/uploads/blog/cover`

- **Autenticação:** Requer token JWT de admin
- **Content-Type:** `multipart/form-data`
- **Campo:** `image` (arquivo)
- **Formatos aceitos:** JPG, JPEG, PNG, WEBP
- **Tamanho máximo:** 5MB

### Exemplo de Uso

```bash
# Upload de imagem
curl -X POST http://localhost:3000/admin/uploads/blog/cover \
  -H "Authorization: Bearer <token>" \
  -F "image=@./minha-imagem.jpg"
```

### Resposta de Sucesso

```json
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/cloud-name/image/upload/v1234567890/blog/covers/abc123.jpg",
    "publicId": "blog/covers/abc123",
    "width": 1920,
    "height": 1080,
    "format": "jpg",
    "bytes": 245760
  },
  "message": "Upload realizado com sucesso"
}
```

### Fluxo Recomendado

1. **Upload:** Envie a imagem para `/admin/uploads/blog/cover`
2. **Obtenha URL:** Use a `url` retornada na resposta
3. **Crie/Edite Post:** Inclua a URL no campo `coverImage` do post

### Segurança

- ✅ API Secret do Cloudinary NUNCA é exposta
- ✅ Apenas admins autenticados podem fazer upload
- ✅ Validação de tipo e tamanho de arquivo
- ✅ Limpeza automática de arquivos temporários
- ✅ URLs seguras (HTTPS) retornadas

## 🧑‍💼 Portal do Cliente

O Portal do Cliente permite que leads/clientes acessem um painel seguro para:
- Editar seus dados
- Visualizar orçamentos (quotes) associados
- Visualizar projeto ativo (se houver orçamento pago)
- Abrir tickets de suporte e trocar mensagens

### Modelos principais
- **Client**: cadastro do cliente (login por e-mail/senha, JWT, bcrypt)
- **Quote**: orçamentos vinculados ao cliente
- **Project**: projeto ativo, criado automaticamente ao pagar um orçamento
- **Ticket**: chamados de suporte
- **TicketMessage**: mensagens de cada ticket

### Segurança
- Autenticação JWT (role=client) e bcrypt
- Rate limit no login (5 tentativas/15min)
- Nunca retorna passwordHash ou token em logs
- Validação de dados com Zod

### Endpoints do Cliente

- `POST /client/auth/login` {email,password}
- `GET /client/me`
- `PATCH /client/me` {name,phone,company,document}
- `POST /client/auth/change-password` {currentPassword,newPassword}
- `GET /client/quotes`
- `GET /client/quotes/:id`
- `GET /client/projects/active`
- `POST /client/tickets` {subject,message,priority}
- `GET /client/tickets`
- `GET /client/tickets/:id`
- `POST /client/tickets/:id/messages` {message}
- `PATCH /client/tickets/:id/close`

### Endpoints Admin (Portal do Cliente)

- `POST /admin/clients` {name,email,phone,company,document,status,temporaryPassword?}
- `GET /admin/clients`
- `GET /admin/clients/:id`
- `PATCH /admin/clients/:id`
- `POST /admin/quotes` {clientId,title,scope,priceCents,status,validUntil,tags?}
- `PATCH /admin/quotes/:id/status` {status}
- `GET /admin/quotes?clientId=`
- `GET /admin/projects?clientId=`
- `PATCH /admin/projects/:id` {status,phase,notes,dueAt}
- `GET /admin/tickets?status=`
- `PATCH /admin/tickets/:id/status` {status}
- `POST /admin/tickets/:id/messages` {message} (authorType=admin)

### Exemplos de uso (cURL)

#### Login do cliente
```bash
curl -X POST http://localhost:3000/client/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"cliente@teste.com","password":"senha123"}'
```

#### Obter dados do cliente
```bash
curl -X GET http://localhost:3000/client/me \
  -H 'Authorization: Bearer <TOKEN_CLIENTE>'
```

#### Listar orçamentos do cliente
```bash
curl -X GET http://localhost:3000/client/quotes \
  -H 'Authorization: Bearer <TOKEN_CLIENTE>'
```

#### Abrir ticket e responder
```bash
# Abrir ticket
curl -X POST http://localhost:3000/client/tickets \
  -H 'Authorization: Bearer <TOKEN_CLIENTE>' \
  -H 'Content-Type: application/json' \
  -d '{"subject":"Dúvida sobre projeto","message":"Como está o andamento?","priority":"medium"}'

# Responder ticket
curl -X POST http://localhost:3000/client/tickets/<ID_TICKET>/messages \
  -H 'Authorization: Bearer <TOKEN_CLIENTE>' \
  -H 'Content-Type: application/json' \
  -d '{"message":"Obrigado pelo retorno!"}'
```

#### Admin: criar client, quote, marcar como pago e validar projeto
```bash
# Criar client
curl -X POST http://localhost:3000/admin/clients \
  -H 'Authorization: Bearer <TOKEN_ADMIN>' \
  -H 'Content-Type: application/json' \
  -d '{"name":"Cliente Teste","email":"cliente@teste.com","status":"active","temporaryPassword":"senha123"}'

# Criar quote
curl -X POST http://localhost:3000/admin/quotes \
  -H 'Authorization: Bearer <TOKEN_ADMIN>' \
  -H 'Content-Type: application/json' \
  -d '{"clientId":"<ID_CLIENTE>","title":"Site novo","scope":"Escopo detalhado","priceCents":150000,"status":"pending"}'

# Marcar quote como pago
curl -X PATCH http://localhost:3000/admin/quotes/<ID_QUOTE>/status \
  -H 'Authorization: Bearer <TOKEN_ADMIN>' \
  -H 'Content-Type: application/json' \
  -d '{"status":"paid"}'

# Validar projeto criado
curl -X GET "http://localhost:3000/admin/projects?clientId=<ID_CLIENTE>" \
  -H 'Authorization: Bearer <TOKEN_ADMIN>'
```

### Arquivos criados/alterados
- src/models/Client.js
- src/models/Quote.js
- src/models/Project.js
- src/models/Ticket.js
- src/models/TicketMessage.js
- src/controllers/client/authController.js
- src/controllers/client/meController.js
- src/controllers/client/quoteController.js
- src/controllers/client/projectController.js
- src/controllers/client/ticketController.js
- src/controllers/admin/clientController.js
- src/controllers/admin/quoteController.js
- src/controllers/admin/projectController.js
- src/controllers/admin/ticketController.js
- src/validators/client.js
- src/validators/admin.js
- src/middlewares/authClient.js
- src/middlewares/rateLimit.js
- src/routes/client.js
- src/routes/admin.js
- src/app.js (adicionada rota /client)
```
