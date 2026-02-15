import React, { createContext, useState, useEffect, useCallback } from 'react'
import { authService } from '../services/authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken')
      if (token) {
        try {
          const user = await authService.getCurrentUser()
          setUser(user)
        } catch (err) {
          console.error('Auth check failed:', err)
          localStorage.removeItem('authToken')
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      setError(null)
      const response = await authService.login(email, password)
      localStorage.setItem('authToken', response.token)
      setUser(response.user)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  const register = useCallback(async (email, password, name) => {
    try {
      setError(null)
      const response = await authService.register(email, password, name)
      localStorage.setItem('authToken', response.token)
      setUser(response.user)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
    setError(null)
  }, [])

  const updateProfile = useCallback(async (data) => {
    try {
      setError(null)
      const updated = await authService.updateProfile(data)
      setUser(updated)
      return updated
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
