# Documentação do Backend

## Visão Geral
diretorio: C:\Users\gabriel.faleiro\Documents\GitHub_fahleiro\c-adoteumpet\backend

O backend do Adote um Pet é uma API RESTful construída com Node.js e Express, responsável por gerenciar a autenticação de usuários, cadastro de pets e fornecer os dados necessários para o frontend.

## Como rodar
navegar até o diretorio e entao rodar `npm run dev`

## Estrutura do Projeto

```
backend/
├── server.js          # Ponto de entrada da aplicação
├── package.json       # Dependências e scripts
├── routes/           # Rotas da API
│   ├── userRoutes.js # Rotas de usuário
│   └── petRoutes.js  # Rotas de pets
└── .env              # Variáveis de ambiente
```

## Endpoints da API

### Autenticação

#### POST /api/register
Registra um novo usuário.

**Request Body:**
```json
{
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Response:**
- 201: Usuário criado com sucesso
- 400: Usuário já existe
- 500: Erro interno do servidor

#### POST /api/login
Autentica um usuário existente.

**Request Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Response:**
- 200: Login bem-sucedido
- 401: Credenciais inválidas
- 500: Erro interno do servidor

#### GET /api/profile
Retorna os dados do usuário autenticado.

**Response:**
- 200: Dados do usuário
- 401: Não autenticado
- 500: Erro interno do servidor

#### POST /api/logout
Realiza o logout do usuário.

**Response:**
- 200: Logout bem-sucedido
- 500: Erro interno do servidor

### Pets

#### POST /api/pets
Cadastra um novo pet para o usuário autenticado.

**Request Body:**
```json
{
  "nome": "Nome do Pet",
  "raca": "Raça do Pet",
  "tem_raca": true,
  "idade": 2,
  "porte": "Médio"
}
```

**Response:**
- 201: Pet cadastrado com sucesso
- 400: Dados inválidos
- 401: Não autenticado
- 500: Erro interno do servidor

## Banco de Dados

### Tabelas

#### t_user
Armazena os dados dos usuários.

#### t_pets
Armazena os dados dos pets, com vínculo ao usuário proprietário.

**Campos:**
- id: Identificador único
- nome: Nome do pet
- raca: Raça do pet (SRD se não tiver raça definida)
- tem_raca: Booleano indicando se o pet tem raça definida
- idade: Idade do pet em anos
- porte: Porte do pet (Pequeno, Médio, Grande)
- id_usuario: Chave estrangeira para o usuário proprietário
- created_at: Data de criação
- updated_at: Data de atualização

## Segurança

- Autenticação baseada em JWT
- Senhas hasheadas com bcrypt
- Cookies HTTP-only
- CORS configurado para desenvolvimento
- Validação de dados de entrada
- Vínculo obrigatório entre pet e usuário