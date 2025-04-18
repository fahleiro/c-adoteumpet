import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyPets.css';

const MyPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        // Configura o axios para enviar cookies
        axios.defaults.withCredentials = true;
        
        const response = await axios.get('http://localhost:3001/api/pets');
        setPets(response.data);
      } catch (err) {
        setError('Erro ao carregar pets');
        console.error('Erro ao buscar pets:', err);
        if (err.response?.status === 401) {
          // Se não estiver autenticado, redireciona para o login
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [navigate]);

  const handleImageChange = (pet) => {
    setSelectedPet(pet);
    setShowImageModal(true);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage || !selectedPet) return;

    try {
      const formData = new FormData();
      formData.append('imagem', selectedImage);

      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:3001/api/pets/${selectedPet.id}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Atualizar a lista de pets
      const updatedPets = pets.map(pet => {
        if (pet.id === selectedPet.id) {
          return { ...pet, imagem_url: URL.createObjectURL(selectedImage) };
        }
        return pet;
      });
      setPets(updatedPets);

      setShowImageModal(false);
      setSelectedImage(null);
      setImagePreview(null);
    } catch (err) {
      console.error('Erro ao fazer upload da imagem:', err);
      alert('Erro ao fazer upload da imagem');
    }
  };

  const handleEditPet = (petId) => {
    navigate(`/editar-pet/${petId}`);
  };

  const handleDeletePet = async (petId) => {
    if (window.confirm('Tem certeza que deseja excluir este pet?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3001/api/pets/${petId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPets(pets.filter(pet => pet.id !== petId));
      } catch (err) {
        console.error('Erro ao excluir pet:', err);
        alert('Erro ao excluir pet');
      }
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="pets-container">
      <h1>Meus Pets</h1>
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
              <button 
                className="change-image-button"
                onClick={() => handleImageChange(pet)}
              >
                Alterar Imagem
              </button>
            </div>
            <div className="pet-info">
              <h2 className="pet-name">{pet.nome}</h2>
              <div className="pet-detail">
                <span className="detail-label">Tipo:</span>
                <span className="detail-value">{pet.tipo}</span>
              </div>
              <div className="pet-detail">
                <span className="detail-label">Raça:</span>
                <span className="detail-value">{pet.raca}</span>
              </div>
              <div className="pet-detail">
                <span className="detail-label">Idade:</span>
                <span className="detail-value">{pet.idade} anos</span>
              </div>
              <div className="pet-detail">
                <span className="detail-label">Sexo:</span>
                <span className="detail-value">{pet.sexo}</span>
              </div>
              <div className="pet-detail">
                <span className="detail-label">Porte:</span>
                <span className="detail-value">{pet.porte}</span>
              </div>
              <div className="pet-detail">
                <span className="detail-label">Status:</span>
                <span className="detail-value">{pet.status}</span>
              </div>
            </div>
            <div className="pet-actions">
              <button 
                className="button-warning"
                onClick={() => handleDeletePet(pet.id)}
              >
                Excluir
              </button>
              <button 
                className="button-success"
                onClick={() => handleEditPet(pet.id)}
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {showImageModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="modal-close-button"
              onClick={() => {
                setShowImageModal(false);
                setSelectedImage(null);
                setImagePreview(null);
              }}
            >
              ×
            </button>
            <h2>Alterar Imagem do Pet</h2>
            <div className="image-upload-container">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="image-upload-input"
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
              <button
                className="upload-button"
                onClick={handleImageUpload}
                disabled={!selectedImage}
              >
                Fazer Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPets; 