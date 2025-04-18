const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { pool } = require('../db')

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token
  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

// Registro de usuário
router.post('/register', async (req, res) => {
  try {
    const {
      primeiro_nome,
      ultimo_nome,
      email,
      senha,
      telefone_1,
      telefone_2,
      cep,
      estado,
      cidade,
      bairro,
      rua,
      numero_rua,
      complemento
    } = req.body

    // Validação dos campos obrigatórios
    const camposObrigatorios = {
      primeiro_nome,
      ultimo_nome,
      email,
      senha,
      telefone_1,
      cep,
      estado,
      cidade,
      bairro,
      rua,
      numero_rua
    }

    for (const [campo, valor] of Object.entries(camposObrigatorios)) {
      if (!valor) {
        return res.status(400).json({ 
          message: `Campo ${campo} é obrigatório`,
          campo: campo
        })
      }
    }

    // Verifica se o email já existe
    const emailCheck = await pool.query(
      'SELECT * FROM t_user WHERE email = $1',
      [email]
    )

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado' })
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10)

    // Insere o novo usuário
    const query = `
      INSERT INTO t_user (
        primeiro_nome, ultimo_nome, email, senha,
        telefone_1, telefone_2, cep, estado, cidade,
        bairro, rua, numero_rua, complemento
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id
    `
    
    const values = [
      primeiro_nome, ultimo_nome, email, hashedPassword,
      telefone_1, telefone_2, cep, estado, cidade,
      bairro, rua, numero_rua, complemento
    ]

    await pool.query(query, values)
    
    res.status(201).json({ message: 'Usuário registrado com sucesso' })
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao registrar usuário',
      error: error.message
    })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body

    // Busca o usuário
    const result = await pool.query(
      'SELECT * FROM t_user WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Email ou senha inválidos' })
    }

    const user = result.rows[0]
    const validPassword = await bcrypt.compare(senha, user.senha)

    if (!validPassword) {
      return res.status(401).json({ message: 'Email ou senha inválidos' })
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Define o cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 horas
    })

    res.json({ message: 'Login realizado com sucesso' })
  } catch (error) {
    console.error('Erro no login:', error)
    res.status(500).json({ message: 'Erro ao fazer login' })
  }
})

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logout realizado com sucesso' })
})

// Perfil do usuário
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, primeiro_nome, ultimo_nome, email, telefone_1, telefone_2, cep, estado, cidade, bairro, rua, numero_rua, complemento FROM t_user WHERE id = $1',
      [req.user.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    res.status(500).json({ message: 'Erro ao buscar perfil' })
  }
})

module.exports = router 