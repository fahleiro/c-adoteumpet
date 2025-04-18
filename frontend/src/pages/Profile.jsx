import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Profile({ onLogout }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/profile', {
          credentials: 'include',
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data)
        } else {
          navigate('/login')
        }
      } catch (error) {
        console.error('Erro:', error)
        navigate('/login')
      }
    }

    fetchProfile()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3001/api/logout', {
        method: 'POST',
        credentials: 'include',
      })
      onLogout()
      navigate('/login')
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  if (!user) {
    return <div>Carregando...</div>
  }

  return (
    <div className="profile-container">
      <h1>Perfil</h1>
      <div className="profile-info">
        <h2>Informações Pessoais</h2>
        <p><strong>Nome:</strong> {user.primeiro_nome} {user.ultimo_nome}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Telefone Principal:</strong> {user.telefone_1}</p>
        {user.telefone_2 && <p><strong>Telefone Secundário:</strong> {user.telefone_2}</p>}

        <h2>Endereço</h2>
        <p><strong>CEP:</strong> {user.cep}</p>
        <p><strong>Estado:</strong> {user.estado}</p>
        <p><strong>Cidade:</strong> {user.cidade}</p>
        <p><strong>Bairro:</strong> {user.bairro}</p>
        <p><strong>Rua:</strong> {user.rua}, {user.numero_rua}</p>
        {user.complemento && <p><strong>Complemento:</strong> {user.complemento}</p>}
      </div>
      <div className="profile-actions">
        <button 
          onClick={() => navigate('/new-pet')} 
          className="action-button"
        >
          Cadastrar Novo Pet
        </button>
        
        <button 
          onClick={() => navigate('/my-pets')} 
          className="action-button"
        >
          Meus Pets
        </button>
        
        <button 
          onClick={() => navigate('/available-pets')} 
          className="action-button"
        >
          Pets Disponíveis para Adoção
        </button>
        
        <button onClick={handleLogout} className="logout-button">
          Sair
        </button>
      </div>
    </div>
  )
}

export default Profile 