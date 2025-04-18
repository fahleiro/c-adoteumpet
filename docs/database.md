# Documentação do Banco de Dados

## Visão Geral

O banco de dados do Adote um Pet utiliza PostgreSQL e está estruturado para armazenar informações dos usuários e futuramente dos pets disponíveis para adoção.

## Estrutura do Banco

### Tabela: t_user

Armazena as informações dos usuários do sistema.

#### Colunas:

| Nome | Tipo | Descrição |
|------|------|-----------|
| id | SERIAL | Identificador único do usuário (chave primária) |
| primeiro_nome | VARCHAR(100) | Primeiro nome do usuário |
| ultimo_nome | VARCHAR(100) | Último nome do usuário |
| email | VARCHAR(255) | Email do usuário (único) |
| senha | VARCHAR(255) | Senha criptografada do usuário |
| telefone_1 | VARCHAR(20) | Telefone principal do usuário |
| telefone_2 | VARCHAR(20) | Telefone secundário do usuário |
| cep | VARCHAR(10) | CEP do endereço do usuário |
| estado | VARCHAR(2) | Estado do endereço do usuário |
| cidade | VARCHAR(100) | Cidade do endereço do usuário |
| bairro | VARCHAR(100) | Bairro do endereço do usuário |
| rua | VARCHAR(200) | Rua do endereço do usuário |
| numero_rua | VARCHAR(10) | Número do endereço do usuário |
| complemento | VARCHAR(200) | Complemento do endereço do usuário |
| created_at | TIMESTAMP | Data de criação do registro |
| updated_at | TIMESTAMP | Data da última atualização do registro |

## Configuração

1. Certifique-se de ter o PostgreSQL instalado e rodando localmente
2. Crie um banco de dados chamado `adoteumpet`:
```sql
CREATE DATABASE adoteumpet;
```
3. Execute o script de criação das tabelas:
```bash
psql -d adoteumpet -f database/schema.sql
```

## Conexão

O backend se conecta ao banco de dados usando as seguintes configurações:
- Host: localhost
- Porta: 5432 (padrão)
- Banco: adoteumpet
- Usuário: [seu usuário do PostgreSQL]
- Senha: [sua senha do PostgreSQL]

## Próximos Passos

- [ ] Implementar tabela de pets
- [ ] Adicionar índices para otimização
- [ ] Implementar backup automático
- [ ] Adicionar mais validações de dados 