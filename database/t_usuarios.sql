-- Drop da tabela se existir
DROP TABLE IF EXISTS t_usuarios;

-- Script de criação da tabela de usuários
CREATE TABLE t_usuarios (
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
    complemento VARCHAR(200)
);