import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    console.error('Erro na autenticação:', error)
    return res.status(403).json({ message: 'Token inválido' })
  }
} 