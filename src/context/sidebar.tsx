'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

interface SidebarContextProps {
  sidebarIsOpen: boolean
  toggleSidebar: () => void
}

export const SidebarContext = createContext({} as SidebarContextProps)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true)

  const toggleSidebar = () => setSidebarIsOpen(!sidebarIsOpen)

  return (
    <SidebarContext.Provider value={{ sidebarIsOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar deve ser usado dentro de um SidebarProvider')
  }
  return context // Adicionando o retorno do contexto aqui
}
