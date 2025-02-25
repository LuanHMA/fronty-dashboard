import Logo from '@/assets/logo.png'
import Image from 'next/image'
import { SigninForm } from './signin-form'
import Link from 'next/link'
import { cookies } from 'next/headers'

export default async function SigninPage() {
  const handleSetCookies = async (
    accessToken: string,
  ) => {
    'use server'
    ;(await cookies()).set('user-token', accessToken)
  }

  return (
    <div className="min-h-screen w-full bg-white sm:bg-gradient-to-r sm:from-minera-dark-500 from-55% sm:to-minera-base-500 grid place-items-center">
      <main className="bg-white  rounded-lg p-4 w-full max-w-sm flex flex-col gap-8 justify-center items-center sm:p-8">
        <Image src={Logo} alt="Logo" width={200}/>
        <SigninForm handleSetCookies={handleSetCookies} />

        <Link href={'/signup'} className="text-sm text-minera-dark-500">
          Não possuo um cadastro ? clique aqui
        </Link>
      </main>
    </div>
  )
}
