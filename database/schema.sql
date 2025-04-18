-- Select das tabelas
SELECT * FROM t_user;
SELECT * FROM t_pets;

-- Drop das tabelas se existirem
DROP TABLE IF EXISTS t_user;
DROP TABLE IF EXISTS t_pets;

-- Script de criação da tabela de usuários
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

-- Trigger para atualizar o updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_t_user_updated_at
    BEFORE UPDATE ON t_user
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Tabela de Pets
CREATE TABLE t_pets (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    raca VARCHAR(100),
    tem_raca BOOLEAN DEFAULT false,
    idade INTEGER NOT NULL,
    porte VARCHAR(20) NOT NULL CHECK (porte IN ('Pequeno', 'Médio', 'Grande')),
    tipo_animal VARCHAR(20) NOT NULL CHECK (tipo_animal IN ('Cachorro', 'Gato')),
    sexo VARCHAR(10) NOT NULL CHECK (sexo IN ('Macho', 'Fêmea')),
    castrado BOOLEAN DEFAULT false,
    disponivel_para_adocao BOOLEAN DEFAULT false,
    imagem_url VARCHAR(255),
    id_usuario INTEGER NOT NULL REFERENCES t_user(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger para atualizar o updated_at dos pets
CREATE TRIGGER update_t_pets_updated_at
    BEFORE UPDATE ON t_pets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 