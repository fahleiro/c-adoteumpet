const express = require('express')
const router = express.Router()
const { pool } = require('../db')
const jwt = require('jsonwebtoken')
const upload = require('../middleware/upload')

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token
  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403)
    req.user = decoded
    next()
  })
}

// Cadastro de novo pet
router.post('/pets', authenticateToken, async (req, res) => {
  try {
    const { nome, raca, tem_raca, idade, porte, tipo_animal, sexo, castrado, disponivel_para_adocao } = req.body
    const id_usuario = req.user.id

    // Validação dos campos obrigatórios
    if (!nome || !idade || !porte || !tipo_animal || !sexo) {
      return res.status(400).json({ message: 'Nome, idade, porte, tipo de animal e sexo são obrigatórios' })
    }

    // Validação do porte
    const portesValidos = ['Pequeno', 'Médio', 'Grande']
    if (!portesValidos.includes(porte)) {
      return res.status(400).json({ message: 'Porte inválido' })
    }

    // Validação do tipo de animal
    const tiposValidos = ['Cachorro', 'Gato']
    if (!tiposValidos.includes(tipo_animal)) {
      return res.status(400).json({ message: 'Tipo de animal inválido' })
    }

    // Validação do sexo
    const sexosValidos = ['Macho', 'Fêmea']
    if (!sexosValidos.includes(sexo)) {
      return res.status(400).json({ message: 'Sexo inválido' })
    }

    // Inserção do pet
    const query = `
      INSERT INTO t_pets (
        nome, raca, tem_raca, idade, porte, tipo_animal, sexo, castrado, disponivel_para_adocao, id_usuario
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id
    `

    const values = [
      nome,
      tem_raca ? raca : 'SRD',
      tem_raca,
      idade,
      porte,
      tipo_animal,
      sexo,
      castrado || false,
      disponivel_para_adocao || false,
      id_usuario
    ]

    const result = await pool.query(query, values)
    
    res.status(201).json({ 
      message: 'Pet cadastrado com sucesso',
      petId: result.rows[0].id
    })
  } catch (error) {
    console.error('Erro ao cadastrar pet:', error)
    res.status(500).json({ 
      message: 'Erro ao cadastrar pet',
      error: error.message
    })
  }
})

// Listar pets do usuário
router.get('/pets', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM t_pets WHERE id_usuario = $1',
      [req.user.id]
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Erro ao listar pets:', error)
    res.status(500).json({ 
      message: 'Erro ao listar pets',
      error: error.message
    })
  }
})

// Listar pets disponíveis para adoção
router.get('/pets/disponiveis', async (req, res) => {
  try {
    console.log('Iniciando busca de pets disponíveis...')
    const result = await pool.query(`
      SELECT 
        p.*, 
        u.primeiro_nome, 
        u.ultimo_nome, 
        u.cidade, 
        u.estado 
      FROM t_pets p 
      LEFT JOIN t_user u ON p.id_usuario = u.id 
      WHERE p.disponivel_para_adocao = true
      ORDER BY p.id DESC
    `)
    
    if (!result.rows || result.rows.length === 0) {
      console.log('Nenhum pet disponível encontrado')
      return res.status(200).json([])
    }

    console.log('Pets encontrados:', result.rows.length)
    res.json(result.rows)
  } catch (error) {
    console.error('Erro detalhado ao listar pets disponíveis:', error)
    res.status(500).json({ 
      message: 'Erro ao listar pets disponíveis',
      error: error.message
    })
  }
})

// Atualizar status de disponibilidade do pet
router.put('/pets/:id/disponibilidade', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { disponivel_para_adocao, confirmacao_nome } = req.body
    const userId = req.user.id

    console.log('Tentando atualizar disponibilidade:', {
      petId: id,
      userId,
      disponivel_para_adocao,
      confirmacao_nome
    })

    // Verifica se o pet existe e pertence ao usuário
    const petCheck = await pool.query(
      'SELECT * FROM t_pets WHERE id = $1 AND id_usuario = $2',
      [id, userId]
    )

    console.log('Resultado da verificação do pet:', petCheck.rows)

    if (petCheck.rows.length === 0) {
      console.log('Pet não encontrado ou não pertence ao usuário')
      return res.status(404).json({ message: 'Pet não encontrado' })
    }

    const pet = petCheck.rows[0]

    // Verifica se o nome de confirmação corresponde
    if (confirmacao_nome !== pet.nome) {
      console.log('Nome de confirmação incorreto:', {
        nomeDigitado: confirmacao_nome,
        nomePet: pet.nome
      })
      return res.status(400).json({ message: 'Nome de confirmação incorreto' })
    }

    // Atualiza o status de disponibilidade
    const updateResult = await pool.query(
      'UPDATE t_pets SET disponivel_para_adocao = $1 WHERE id = $2 RETURNING *',
      [disponivel_para_adocao, id]
    )

    console.log('Pet atualizado com sucesso:', updateResult.rows[0])

    res.json({ 
      message: 'Status de disponibilidade atualizado com sucesso',
      pet: updateResult.rows[0]
    })
  } catch (error) {
    console.error('Erro detalhado ao atualizar disponibilidade:', error)
    res.status(500).json({ 
      message: 'Erro ao atualizar status de disponibilidade',
      error: error.message,
      stack: error.stack
    })
  }
})

// Upload de imagem do pet
router.post('/pets/:id/upload', authenticateToken, upload.single('imagem'), async (req, res) => {
  try {
    const petId = req.params.id
    const userId = req.user.id

    // Verifica se o pet pertence ao usuário
    const petResult = await pool.query(
      'SELECT * FROM t_pets WHERE id = $1 AND id_usuario = $2',
      [petId, userId]
    )

    if (petResult.rows.length === 0) {
      return res.status(404).json({ message: 'Pet não encontrado ou não pertence ao usuário' })
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Nenhuma imagem foi enviada' })
    }

    const imagemUrl = `/uploads/${req.file.filename}`

    // Atualiza o pet com a URL da imagem
    const updateResult = await pool.query(
      'UPDATE t_pets SET imagem_url = $1 WHERE id = $2 RETURNING *',
      [imagemUrl, petId]
    )

    res.json({
      message: 'Imagem atualizada com sucesso',
      pet: updateResult.rows[0]
    })
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error)
    res.status(500).json({ 
      message: 'Erro ao fazer upload da imagem',
      error: error.message
    })
  }
})

module.exports = router 