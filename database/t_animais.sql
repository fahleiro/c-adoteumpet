-- Drop da tabela se existir
DROP TABLE IF EXISTS t_animais;

-- Tabela de Animais
CREATE TABLE t_animais (
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
    id_usuario INTEGER NOT NULL REFERENCES t_usuarios(id) ON DELETE CASCADE
); 