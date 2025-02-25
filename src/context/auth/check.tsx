'use client'

import { ReactNode, useContext, useEffect } from 'react'
import { AuthContext } from './context'
import { usePathname, useRouter } from 'next/navigation'
import { User } from '@/types/user'

export function AuthCheck({
  children,
  user,
}: {
  children: ReactNode
  user: User
}) {
  const { updateUser } = useContext(AuthContext)

  const router = useRouter()
  const pathName = usePathname()

  const isToCheck = ['/signin', '/', '/signup'].includes(pathName)

  useEffect(() => {
    const hasUser = !!user?.email
    if (hasUser) {
      updateUser(user)

      if (isToCheck) {
        router.push(`/app/dashboard`)
      }
    } else if (!isToCheck) {
      router.push(`/signin`)
    }
  }, [user, pathName])

  if (!user?.email && !isToCheck) return null

  return children
}
