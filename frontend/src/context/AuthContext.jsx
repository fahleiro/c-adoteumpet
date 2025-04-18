import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/profile', {
        withCredentials: true
      })
      setUser(response.data)
      setIsAuthenticated(true)
    } catch (error) {
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/login',
        { email, password },
        { withCredentials: true }
      )
      setUser(response.data.user)
      setIsAuthenticated(true)
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/register',
        { name, email, password },
        { withCredentials: true }
      )
      setUser(response.data.user)
      setIsAuthenticated(true)
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  const logout = async () => {
    try {
      await axios.post('http://localhost:3001/api/logout', {}, { withCredentials: true })
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 