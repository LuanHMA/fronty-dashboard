'use client'

import { useAuth } from '@/context/auth/provider'
import { useParams, usePathname } from 'next/navigation'

export function PageTitle() {
  const { id, offerId } = useParams()

  const pages = [
    {
      name: 'Dashboard',
      path: '/app/dashboard',
    },
    {
      name: 'Gerenciamento de Usuários',
      path: '/app/user-manager',
    },
    {
      name: 'Informações gerais do usuário',
      path: `/app/user-manager/${id}`,
    },
    {
      name: 'Ofertas do usuário',
      path: `/app/user-manager/${id}/offers`,
    },
    {
      name: 'Detalhes da oferta do usuário',
      path: `/app/user-manager/${id}/offers/${offerId}`,
    },
    {
      name: 'Plano e Pagamentos do usuário',
      path: `/app/user-manager/${id}/payments`,
    },
    {
      name: 'Gerenciamento de Planos',
      path: '/app/plans-manager',
    },
    {
      name: 'Gerenciamento de Ofertas',
      path: '/app/offers-manager',
    },
    {
      name: 'Gerenciamento de Scrapping',
      path: '/app/scrapping-manager',
    },

    {
      name: 'Informações do usuário',
      path: '/app/user-manager/[id]',
    },
  ]

  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <div className={`flex-col items-start hidden sm:flex`}>
      <h1 className="text-base font-semibold sm:text-2xl text-neutral-900">
        {pages.find((route) => pathname === route.path)?.name}
      </h1>
      {pathname === '/app/dashboard' && (
        <h2 className="font-medium text-sm text-neutral-500 ">
          Olá, {user?.name?.split(' ').splice(0, 2).join(' ')}
        </h2>
      )}
    </div>
  )
}
