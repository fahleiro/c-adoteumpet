const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const petRoutes = require('./routes/petRoutes')
const path = require('path')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// Configuração para servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Rotas
app.use('/api', userRoutes)
app.use('/api', petRoutes)

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err.message)
  res.status(500).json({ 
    message: 'Erro interno do servidor',
    error: err.message
  })
})

// Tratamento de erros não capturados
process.on('uncaughtException', (err) => {
  console.error('Erro não capturado:', err.message)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Promessa rejeitada:', reason)
})

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

// Mantém o processo rodando
process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  server.close(() => {
    process.exit(0)
  })
}) 