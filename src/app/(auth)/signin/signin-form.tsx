'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordField, TextField } from '@/components/ui/inputs'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/auth/provider'
import { useRouter } from 'next/navigation'

const signinSchema = z.object({
  email: z
    .string({ required_error: 'O email é obrigatório!' })
    .email('Digite um e-mail válido!')
    .nonempty('O e-mail é obrigatório!'),
  password: z.string().nonempty('Digite sua senha!'),
})

type signinSchemaType = z.infer<typeof signinSchema>

interface SigninFormProps {
  handleSetCookies: (accessToken: string) => Promise<void>
}

export function SigninForm({ handleSetCookies }: SigninFormProps) {
  const { login } = useAuth()
  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signinSchemaType>({
    resolver: zodResolver(signinSchema),
  })

  const handleSignin = async (data: signinSchemaType) => {
    try {
      const response = await login(data.email, data.password)

      if (response.accessToken) {
        await handleSetCookies(response.accessToken)
        push('/app/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignin)} className="w-full space-y-4">
      <TextField
        register={register}
        name="email"
        error={errors.email?.message}
        placeholder="Digite seu e-mail"
        type="email"
        id="email"
        className="text-sm"
      />

      <PasswordField
        register={register}
        name="password"
        error={errors.password?.message}
        placeholder="Senha"
        className="text-sm"
      />

      <Button
        size="full"
        variant="primary"
        loading={isSubmitting}
        type="submit"
        className="text-base"
      >
        Entrar
      </Button>
    </form>
  )
}
