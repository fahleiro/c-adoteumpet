import express from 'express'
import multer from 'multer'
import path from 'path'
import { pool } from '../db.js'
import { authenticateToken } from '../middleware/auth.js'
import fs from 'fs'

const router = express.Router()

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads')
    // Garante que o diretório existe
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    console.log('Arquivo recebido:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    })

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      console.error('Tipo de arquivo não permitido:', file.mimetype)
      cb(new Error('Tipo de arquivo não permitido. Apenas JPG, JPEG e PNG são aceitos.'))
    }
  }
})

// Upload de imagem para um pet
router.post('/pets/:petId/images', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    console.log('Iniciando upload de imagem...')
    const { petId } = req.params
    const userId = req.user.id

    if (!req.file) {
      console.error('Nenhum arquivo recebido')
      return res.status(400).json({ message: 'Nenhum arquivo foi enviado' })
    }

    console.log('Arquivo recebido:', {
      originalname: req.file.originalname,
      path: req.file.path,
      size: req.file.size
    })

    // Verifica se o pet pertence ao usuário
    const petCheck = await pool.query(
      'SELECT * FROM t_pets WHERE id = $1 AND id_usuario = $2',
      [petId, userId]
    )

    if (petCheck.rows.length === 0) {
      console.error('Pet não encontrado ou não pertence ao usuário:', { petId, userId })
      return res.status(404).json({ message: 'Pet não encontrado ou não pertence ao usuário' })
    }

    // Verifica quantas imagens o pet já tem
    const imageCount = await pool.query(
      'SELECT COUNT(*) FROM t_pet_img WHERE id_pet = $1',
      [petId]
    )

    if (imageCount.rows[0].count >= 5) {
      console.error('Limite de imagens atingido para o pet:', petId)
      return res.status(400).json({ message: 'Limite máximo de 5 imagens por pet atingido' })
    }

    // Insere a nova imagem
    const result = await pool.query(
      `INSERT INTO t_pet_img (id_pet, nome_arquivo, caminho_arquivo, ordem)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [
        petId,
        req.file.filename, // Usando o nome gerado pelo multer
        req.file.path,
        parseInt(imageCount.rows[0].count) + 1
      ]
    )

    console.log('Imagem adicionada com sucesso:', result.rows[0])
    res.status(201).json({
      message: 'Imagem adicionada com sucesso',
      image: result.rows[0]
    })
  } catch (error) {
    console.error('Erro detalhado ao adicionar imagem:', error)
    // Se houver erro, remove o arquivo que foi salvo
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path)
      } catch (unlinkError) {
        console.error('Erro ao remover arquivo após falha:', unlinkError)
      }
    }
    res.status(500).json({ 
      message: 'Erro ao adicionar imagem', 
      error: error.message,
      details: error.stack
    })
  }
})

// Listar imagens de um pet
router.get('/pets/:petId/images', async (req, res) => {
  try {
    const { petId } = req.params

    const result = await pool.query(
      'SELECT * FROM t_pet_img WHERE id_pet = $1 ORDER BY ordem',
      [petId]
    )

    res.json(result.rows)
  } catch (error) {
    console.error('Erro ao listar imagens:', error)
    res.status(500).json({ message: 'Erro ao listar imagens', error: error.message })
  }
})

// Remover imagem de um pet
router.delete('/pets/:petId/images/:imageId', authenticateToken, async (req, res) => {
  try {
    const { petId, imageId } = req.params
    const userId = req.user.id

    // Verifica se o pet pertence ao usuário
    const petCheck = await pool.query(
      'SELECT * FROM t_pets WHERE id = $1 AND id_usuario = $2',
      [petId, userId]
    )

    if (petCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Pet não encontrado ou não pertence ao usuário' })
    }

    // Remove a imagem
    await pool.query(
      'DELETE FROM t_pet_img WHERE id = $1 AND id_pet = $2',
      [imageId, petId]
    )

    res.json({ message: 'Imagem removida com sucesso' })
  } catch (error) {
    console.error('Erro ao remover imagem:', error)
    res.status(500).json({ message: 'Erro ao remover imagem', error: error.message })
  }
})

export default router 