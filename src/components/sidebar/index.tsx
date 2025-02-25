'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/assets/logo.png'
import LogoSmall from '@/assets/logo-small.png'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { LogoutButton } from './logout-button'
import { menuItems } from '@/constants/menu-links'
import { useSidebar } from '@/context/sidebar'

export function Sidebar() {
  const { sidebarIsOpen, toggleSidebar } = useSidebar()
  const pathname = usePathname()

  return (
    <aside
      className={`min-h-screen relative ${sidebarIsOpen ? 'w-64' : 'w-20'} bg-neutral-0  transition-all duration-300 hidden md:block z-[99]`}
    >
      <div
        className={`${sidebarIsOpen ? 'w-64' : 'w-20'}  h-screen fixed left-0 top-0 bg-neutral-0 bottom-0 border-r  `}
      >
        <button
          className="w-7 h-7 rounded-full border flex items-center justify-center absolute -right-4 top-24 bg-neutral-0  z-20"
          onClick={toggleSidebar}
          aria-label={sidebarIsOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {sidebarIsOpen ? (
            <CaretLeft
              size={14}
              weight="bold"
              className="hover:text-minera-dark-500"
            />
          ) : (
            <CaretRight
              size={14}
              weight="bold"
              className="hover:text-minera-dark-500"
            />
          )}
        </button>

        <div className="space-y-4">
          <div className="p-4">
            {sidebarIsOpen ? (
              <>
                <Image
                  src={Logo}
                  alt="Minera Admin"
                  width={180}
                  className="m-auto  animate-scaleIn"
                />
              </>
            ) : (
              <Image
                src={LogoSmall}
                alt="Minera Admin"
                width={100}
                className="m-auto animate-scaleIn"
              />
            )}
            <h1 className="sr-only">Minera Admin</h1>
          </div>

          <ul className="space-y-1 pt-4">
            <h2 className="text-sm uppercase text-neutral-400 ml-4 mb-2">
              Menu
            </h2>
            {menuItems.map(({ label, href, icon: Icon }) => (
              <li key={href} className={`relative group`}>
                <Link
                  href={href}
                  className={`flex items-center gap-2 text-sm py-3 px-5 hover:bg-minera-dark-25 hover:text-minera-dark-500 
                    ${
                      pathname.includes(href)
                        ? 'bg-minera-dark-25 text-minera-dark-500 font-medium '
                        : 'text-neutral-900'
                    } ${!sidebarIsOpen && 'flex items-center justify-center'}`}
                >
                  <Icon
                    size={20}
                    weight={pathname.includes(href) ? 'duotone' : 'regular'}
                  />
                  <span
                    className={`${!sidebarIsOpen ? 'hidden' : 'block animate-scaleIn'}`}
                  >
                    {label}
                  </span>
                </Link>

                <span
                  className={`absolute bg-neutral-0 z-50 -right-28 border rounded-lg text-center top-1/4 transform text-sm text-minera-dark-500  p-1 hidden group-hover:animate-fadeIn group-hover:block ${sidebarIsOpen && 'hidden group-hover:hidden'} w-24 after:content-[''] after:absolute after:w-0 after:h-0 after:border-y-[8px] after:border-y-transparent after:border-r-[8px] after:border-r-minera-dark-500 after:-left-2 after:top-1/2 after:-translate-y-1/2`}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <div className="px-4 py-2 absolute bottom-4 w-full">
            <LogoutButton />
          </div>
        </div>
      </div>
    </aside>
  )
}
