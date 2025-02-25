/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ReactNode, useContext, useState } from 'react'
import { AuthContext } from './context'
import Cookies from 'js-cookie'
import { useApi } from '@/hooks/useApi'
import { User } from '@/types/user'
import { notifyError } from '@/components/ui/toast'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({} as User)
  const [loading, setLoading] = useState(true)
  const { execute } = useApi()

  async function updateUser(user: User) {
    setUser({ ...user })
    setLoading(false)
  }

  async function login(email: string, password: string) {
    try {
      const response = await execute('v1/auth/login', 'POST', {
        email,
        password,
        })
        

      const { token } = response

      if (token) {
        Cookies.set('user-token', token)

        return { accessToken: token }
      }
      else {
        notifyError(response.message)
      }

      notifyError(response.message)
      return { accessToken: ''}
    } catch (error: any) {
      console.log(error)
      notifyError(error.message)
      return { accessToken: ''}
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    if (typeof window !== 'undefined') {
      Cookies.remove('user-token')
      Cookies.remove('refresh-token')
      window.location.href = `/signin`
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
