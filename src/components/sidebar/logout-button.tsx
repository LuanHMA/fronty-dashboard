'use client'

import { useAuth } from '@/context/auth/provider'
import { useSidebar } from '@/context/sidebar'
import { SignOut } from '@phosphor-icons/react'

export function LogoutButton() {
  const { logout } = useAuth()
  const { sidebarIsOpen } = useSidebar()

  return (
    <button
      onClick={logout}
      className={`gap-2 w-full ${sidebarIsOpen ? 'flex items-center justify-start' : 'flex items-center justify-center'} group hover:text-danger-dark relative`}
    >
      <SignOut
        size={20}
        className={` hover:text-danger-dark text-neutral-900 `}
      />
      <span
        className={`${!sidebarIsOpen ? 'hidden' : 'block animate-scaleIn'} text-sm text-neutral-900   group-hover:text-danger-dark`}
      >
        Deslogar
      </span>

      <span
        className={`absolute -right-32 border rounded-lg text-center top-0 transform text-sm text-minera-dark-500  p-1 hidden group-hover:animate-fadeIn group-hover:block ${sidebarIsOpen && 'hidden group-hover:hidden'} w-24 after:content-[''] after:absolute after:w-0 after:h-0 after:border-y-[8px] after:border-y-transparent after:border-r-[8px] after:border-r-minera-dark-500 after:-left-2 after:top-1/2 after:-translate-y-1/2`}
      >
        Deslogar
      </span>
    </button>
  )
}
