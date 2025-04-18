import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NewPet.css'

function NewPet() {
  const [formData, setFormData] = useState({
    nome: '',
    raca: '',
    tem_raca: false,
    idade: '',
    porte: '',
    tipo_animal: '',
    sexo: '',
    castrado: false,
    disponivel_para_adocao: false
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/api/pets', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Erro ao cadastrar pet')
      }

      alert('Pet cadastrado com sucesso!')
      navigate('/profile')
    } catch (error) {
      console.error('Erro:', error)
      alert(error.message || 'Ocorreu um erro ao cadastrar o pet')
    }
  }

  return (
    <div className="form-container">
      <h1>Cadastrar Novo Pet</h1>
      <form onSubmit={handleSubmit} className="pet-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nome">Nome do Pet</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tipo_animal">Tipo de Animal</label>
            <select
              id="tipo_animal"
              name="tipo_animal"
              value={formData.tipo_animal}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o tipo</option>
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="sexo">Sexo</label>
            <select
              id="sexo"
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o sexo</option>
              <option value="Macho">Macho</option>
              <option value="Fêmea">Fêmea</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="idade">Idade (em anos)</label>
            <input
              type="number"
              id="idade"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="porte">Porte</label>
            <select
              id="porte"
              name="porte"
              value={formData.porte}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o porte</option>
              <option value="Pequeno">Pequeno</option>
              <option value="Médio">Médio</option>
              <option value="Grande">Grande</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="castrado"
                checked={formData.castrado}
                onChange={handleChange}
              />
              Castrado
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="tem_raca"
              checked={formData.tem_raca}
              onChange={handleChange}
            />
            Possui raça definida
          </label>
        </div>

        {formData.tem_raca && (
          <div className="form-group">
            <label htmlFor="raca">Raça</label>
            <input
              type="text"
              id="raca"
              name="raca"
              value={formData.raca}
              onChange={handleChange}
              required={formData.tem_raca}
            />
          </div>
        )}

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="disponivel_para_adocao"
              checked={formData.disponivel_para_adocao}
              onChange={handleChange}
            />
            Disponibilizar para adoção
          </label>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/profile')} className="cancel-button">
            Cancelar
          </button>
          <button type="submit" className="submit-button">
            Cadastrar Pet
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewPet 