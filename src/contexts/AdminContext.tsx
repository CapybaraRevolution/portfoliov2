'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AdminContextType {
  isAdmin: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)

  // Check if admin is already logged in (from localStorage)
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin')
    if (adminStatus === 'true') {
      setIsAdmin(true)
    }
  }, [])

  const login = (email: string, password: string): boolean => {
    // Check against environment variables
    const adminEmail = 'kylemcgraw1993@gmail.com'
    const adminPassword = 'qystyp-wywwu8-hifgIb'
    
    if (email === adminEmail && password === adminPassword) {
      setIsAdmin(true)
      localStorage.setItem('isAdmin', 'true')
      localStorage.setItem('adminEmail', email)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAdmin(false)
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('adminEmail')
  }

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}