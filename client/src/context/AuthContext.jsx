import { createContext, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import axiosInstance from '../api/axiosInstance'
import { AUTH_STORAGE_KEY } from '../utils/constants'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem(AUTH_STORAGE_KEY))
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('notes_app_user')
    return raw ? JSON.parse(raw) : null
  })
  const [loading, setLoading] = useState(false)

  const register = async (payload) => {
    setLoading(true)
    try {
      await axiosInstance.post('/auth/register', payload)
      toast.success('Registered successfully. Please login.')
    } finally {
      setLoading(false)
    }
  }

  const login = async (payload) => {
    setLoading(true)
    try {
      const { data } = await axiosInstance.post('/auth/login', payload)
      setToken(data.token)
      setUser(data.user)
      localStorage.setItem(AUTH_STORAGE_KEY, data.token)
      localStorage.setItem('notes_app_user', JSON.stringify(data.user))
      toast.success('Welcome back!')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
    localStorage.removeItem('notes_app_user')
    toast.success('Logged out')
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      loading,
      register,
      login,
      logout,
    }),
    [token, user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
