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
    complemento VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger para atualizar o updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_t_usuarios_updated_at
    BEFORE UPDATE ON t_usuarios
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 