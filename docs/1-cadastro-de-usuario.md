# cadastro de usuário
- formulário de cadastro de novo usuário
- será utilizado pelos usuários para se cadastrarem
- tela publica

## implementação técnica

### Frontend
- Caminho: `/frontend/src/pages/Register.tsx`
- Tecnologias: React, TypeScript
- Componentes principais:
  - Formulário de cadastro
  - Validação de campos
  - Integração com API

### Backend
- Caminho: `/backend/src/controllers/UserController.ts`
- Tecnologias: Node.js, TypeScript
- Endpoints:
  - POST `/api/users/register` - Registro de novo usuário
  - Validação de dados
  - Criptografia de senha
  - Geração de token JWT

### Banco de Dados
- Caminho do schema: `/database/schema.sql`
- Sistema: PostgreSQL
- Tabela: `t_user`

#### Estrutura da Tabela t_user
```sql
CREATE TABLE t_user (
    id SERIAL PRIMARY KEY,
    primeiro_nome VARCHAR(100) NOT NULL,
    ultimo_nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone_1 VARCHAR(20),
    telefone_2 VARCHAR(20),
    cep VARCHAR(10),
    estado VARCHAR(2),
    cidade VARCHAR(100),
    bairro VARCHAR(100),
    rua VARCHAR(200),
    numero_rua VARCHAR(10),
    complemento VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Triggers e Funções
- Trigger `update_t_user_updated_at` para atualização automática do campo `updated_at`
- Função `update_updated_at_column()` para gerenciar a atualização do timestamp

## campos obrigatórios
- primeiro nome
- último nome
- email
- senha
- telefone principal
- cep
- estado
- cidade
- bairro
- rua
-número

## campos opcionais
- telefone secundário
- complemento do endereço

## elementos adicionais
- botao 'Registrar' para enviar o formulario
- texto para usuarios item a tela de login 'Já tem uma conta? Faça login' 