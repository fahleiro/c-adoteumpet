import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NewPet from './pages/NewPet'
import MyPets from './pages/MyPets'
import AvailablePets from './pages/AvailablePets'
import { useState, useEffect } from 'react'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/profile', {
          credentials: 'include'
        })
        setIsAuthenticated(response.ok)
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/profile" /> : <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? <Navigate to="/profile" /> : <Register onRegister={handleLogin} />
            } 
          />
          <Route 
            path="/profile" 
            element={
              isAuthenticated ? <Profile onLogout={handleLogout} /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/new-pet" 
            element={
              isAuthenticated ? <NewPet /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/my-pets" 
            element={
              isAuthenticated ? <MyPets /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/available-pets" 
            element={
              isAuthenticated ? <AvailablePets /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/" 
            element={
              isAuthenticated ? <Navigate to="/profile" /> : <Navigate to="/login" />
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
