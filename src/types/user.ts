export interface User {
    id: string
    name: string
    email: string
    role: 'ADMIN'
    createdAt: string
    updatedAt: string
  }
  
  export interface RegisterUser {
    name: string
    email: string
    password: string
  }