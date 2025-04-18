const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const db = require('../db');

// Rota para upload de imagem do pet
router.post('/:id/upload', upload.single('imagem'), async (req, res) => {
    try {
        const petId = req.params.id;
        const userId = req.user.id;

        if (!req.file) {
            return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
        }

        const imagemUrl = `/uploads/${req.file.filename}`;

        // Verifica se o pet existe e pertence ao usuário
        const petCheck = await db.query(
            'SELECT * FROM t_pets WHERE id = $1 AND id_usuario = $2',
            [petId, userId]
        );

        if (petCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Pet não encontrado ou não pertence ao usuário' });
        }

        // Atualiza o pet com a URL da imagem
        const result = await db.query(
            'UPDATE t_pets SET imagem_url = $1 WHERE id = $2 RETURNING *',
            [imagemUrl, petId]
        );

        res.json({
            message: 'Imagem atualizada com sucesso',
            pet: result.rows[0]
        });
    } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
        res.status(500).json({ 
            error: 'Erro ao fazer upload da imagem',
            details: error.message 
        });
    }
});

module.exports = router; 