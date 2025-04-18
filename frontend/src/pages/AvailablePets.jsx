import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './MyPets.css'

function AvailablePets() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchAvailablePets()
  }, [])

  const fetchAvailablePets = async () => {
    try {
      console.log('Buscando pets disponíveis...')
      const response = await fetch('http://localhost:3001/api/pets/disponiveis', {
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Erro ao carregar pets disponíveis')
      }

      const data = await response.json()
      console.log('Pets disponíveis encontrados:', data.length)
      setPets(data)
    } catch (error) {
      console.error('Erro ao buscar pets disponíveis:', error)
      setError(error.message || 'Ocorreu um erro ao carregar os pets disponíveis')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Carregando...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="pets-container">
      <h1>Pets Disponíveis para Adoção</h1>
      
      {pets.length === 0 ? (
        <div className="no-pets-message">
          <p>Não há pets disponíveis para adoção no momento.</p>
        </div>
      ) : (
        <div className="pets-grid">
          {pets.map(pet => (
            <div key={pet.id} className="pet-card">
              <div className="pet-image-container">
                {pet.imagem_url ? (
                  <img 
                    src={`http://localhost:3001${pet.imagem_url}`} 
                    alt={pet.nome} 
                    className="pet-image"
                  />
                ) : (
                  <div className="pet-image-placeholder">
                    Sem imagem
                  </div>
                )}
              </div>
              
              <div className="pet-info">
                <h2 className="pet-name">{pet.nome}</h2>
                <div className="pet-detail">
                  <span className="detail-label">Tipo:</span>
                  <span className="detail-value">{pet.tipo_animal}</span>
                </div>
                <div className="pet-detail">
                  <span className="detail-label">Idade:</span>
                  <span className="detail-value">{pet.idade} anos</span>
                </div>
                <div className="pet-detail">
                  <span className="detail-label">Porte:</span>
                  <span className="detail-value">{pet.porte}</span>
                </div>
                <div className="pet-detail">
                  <span className="detail-label">Raça:</span>
                  <span className="detail-value">{pet.tem_raca ? pet.raca : 'SRD'}</span>
                </div>
                <div className="pet-detail">
                  <span className="detail-label">Sexo:</span>
                  <span className="detail-value">{pet.sexo}</span>
                </div>
                <div className="pet-detail">
                  <span className="detail-label">Castrado:</span>
                  <span className="detail-value">{pet.castrado ? 'Sim' : 'Não'}</span>
                </div>
                <div className="pet-detail">
                  <span className="detail-label">Localização:</span>
                  <span className="detail-value">{pet.cidade} - {pet.estado}</span>
                </div>
                <div className="pet-detail">
                  <span className="detail-label">Doador:</span>
                  <span className="detail-value">{pet.primeiro_nome} {pet.ultimo_nome}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AvailablePets 