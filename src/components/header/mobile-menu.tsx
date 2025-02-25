'use client'

import { useState } from 'react'
import { List, SignOut, User, X } from '@phosphor-icons/react'
import { menuItems } from '@/constants/menu-links'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/auth/provider'
import { Button } from '../ui/button'

export function MobileMenu() {
  const pathname = usePathname()
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const { user, logout } = useAuth()

  const toggleMenu = () => setMenuIsOpen(!menuIsOpen)
  const closeMenu = () => setMenuIsOpen(false)

  return (
    <>
      <Button variant="ghost" size="icon" onClick={toggleMenu}>
        <List size={22} className="text-neutral-900 " />
      </Button>

      <div
        className={`fixed inset-0 bg-neutral-900/20  z-40  ${menuIsOpen ? 'visible' : 'invisible'}`}
        onClick={closeMenu}
      />

      <div
        className={`${menuIsOpen ? 'right-0 w-10/12' : '-right-[800%] w-0'} ease-in-out duration-500 transition-all fixed top-0 -right-4 h-screen border-l border-l-neutral-100 bg-neutral-0 z-50`}
      >
        <div
          className={`space-y-4  ${menuIsOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}
        >
          <div className="flex justify-end px-4 pt-4">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X size={22} className="text-neutral-900" />
            </Button>
          </div>

          <div className="flex flex-col items-start px-4 border-b border-b-neutral-100  pb-4">
            <h2 className="truncate text-center font-poppins text-sm font-semibold text-neutral-900  capitalize">
              {user && user.name?.split(' ').splice(0, 2).join(' ')}
            </h2>
            <span className="text-center text-sm text-neutral-600">
              {user.email}
            </span>
          </div>

          <div
            className={`border-b border-b-neutral-100  pb-4`}
          >
            <h2 className="text-sm uppercase text-start px-4 pb-4 font-medium text-neutral-500">
              MENU
            </h2>
            <ul className="space-y-2">
              {menuItems.map(({ label, href, icon: Icon }) => (
                <li key={href} className={`relative group`}>
                  <Link
                    href={href}
                    onClick={closeMenu}
                    className={`flex items-center gap-2 text-sm py-3 px-5  hover:bg-minera-dark-25 hover:text-minera-dark-500  translation-all
                  ${
                    pathname === href
                      ? 'bg-minera-dark-25 text-minera-dark-500 font-medium '
                      : 'text-neutral-900 d'
                  }`}
                  >
                    <Icon
                      size={20}
                      weight={pathname === href ? 'fill' : 'regular'}
                    />

                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <button onClick={logout} className="flex items-center px-4 gap-2">
            <SignOut size={20} className="text-danger-dark" />
            <span className="text-sm text-neutral-900  hover:text-danger-dark">
              Deslogar
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
