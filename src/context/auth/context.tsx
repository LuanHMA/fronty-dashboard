import { User } from '@/types/user';
import { createContext } from 'react'

interface AuthContextProps {
  user: User
  updateUser: (user: User) => void
  login: (
    email: string,
    password: string,
  ) => Promise<{ accessToken: string }>
  logout: () => void
  loading: boolean
}

export const AuthContext = createContext({} as AuthContextProps)
