-- Função para gerar ID único de 9 dígitos
CREATE OR REPLACE FUNCTION gerar_id_animal()
RETURNS TRIGGER AS $$
DECLARE
    novo_id BIGINT;
BEGIN
    -- Gera um número aleatório de 9 dígitos
    novo_id := floor(random() * 900000000 + 100000000)::BIGINT;
    
    -- Verifica se o ID já existe
    WHILE EXISTS (SELECT 1 FROM t_animais WHERE id = novo_id) LOOP
        novo_id := floor(random() * 900000000 + 100000000)::BIGINT;
    END LOOP;
    
    NEW.id := novo_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para gerar ID automaticamente antes do insert
CREATE TRIGGER tr_gerar_id_animal
BEFORE INSERT ON t_animais
FOR EACH ROW
EXECUTE FUNCTION gerar_id_animal(); 