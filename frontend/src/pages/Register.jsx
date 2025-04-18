import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    primeiro_nome: '',
    ultimo_nome: '',
    email: '',
    senha: '',
    telefone_1: '',
    telefone_2: '',
    cep: '',
    estado: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero_rua: '',
    complemento: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Cadastro realizado com sucesso!')
        navigate('/login')
      } else {
        const data = await response.json()
        alert(data.message || 'Registro falhou. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Ocorreu um erro ao registrar.')
    }
  }

  return (
    <div className="form-container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="primeiro_nome">Primeiro Nome</label>
          <input
            type="text"
            id="primeiro_nome"
            name="primeiro_nome"
            value={formData.primeiro_nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ultimo_nome">Último Nome</label>
          <input
            type="text"
            id="ultimo_nome"
            name="ultimo_nome"
            value={formData.ultimo_nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone_1">Telefone Principal</label>
          <input
            type="tel"
            id="telefone_1"
            name="telefone_1"
            value={formData.telefone_1}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone_2">Telefone Secundário (opcional)</label>
          <input
            type="tel"
            id="telefone_2"
            name="telefone_2"
            value={formData.telefone_2}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cep">CEP</label>
          <input
            type="text"
            id="cep"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <input
            type="text"
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cidade">Cidade</label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bairro">Bairro</label>
          <input
            type="text"
            id="bairro"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rua">Rua</label>
          <input
            type="text"
            id="rua"
            name="rua"
            value={formData.rua}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="numero_rua">Número</label>
          <input
            type="text"
            id="numero_rua"
            name="numero_rua"
            value={formData.numero_rua}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="complemento">Complemento (opcional)</label>
          <input
            type="text"
            id="complemento"
            name="complemento"
            value={formData.complemento}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Registrar</button>
      </form>
      <div className="link">
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </div>
    </div>
  )
}

export default Register 