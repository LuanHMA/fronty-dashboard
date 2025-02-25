'use client'

import React, { InputHTMLAttributes, useState, ReactNode } from 'react'
import { UseFormRegister } from 'react-hook-form'
import clsx from 'clsx'
import { Eye, EyeSlash, MagnifyingGlass } from '@phosphor-icons/react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  rightIcon?: ReactNode
  leftIcon?: ReactNode
  width?: string
  height?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  label?: string
}

const inputStyles =
  'flex h-12 w-full items-center gap-2 rounded-lg border bg-neutral-0 px-[14px] py-2 outline-none  transition-all duration-200'

const errorStyles = 'border-danger-base'
const successStyles = 'border-neutral-100'
const focusStyles =
  'focus-within:border-minera-dark-500 focus-within:shadow-input-focus'
const disabledStyles = 'cursor-not-allowed border-dashed'

export function TextField({
  rightIcon,
  leftIcon,
  error,
  className,
  register,
  width,
  height,
  label,
  ...props
}: TextFieldProps) {
  return (
    <fieldset
      className={clsx(props.disabled && 'cursor-not-allowed', width, height)}
    >
      {label && (
        <label
          htmlFor={props.id}
          className={`text-minera-dark-500 text-sm font-semibold mb-1`}
        >
          {label}
        </label>
      )}
      <div
        className={clsx(
          inputStyles,
          error ? errorStyles : successStyles,
          focusStyles,
          props.disabled && disabledStyles,
        )}
      >
        {leftIcon && leftIcon}
        <input
          {...props}
          id={props.id}
          {...(register && {
            ...register(props.name as string, {
              valueAsNumber: props.type === 'number',
              onBlur: (e) => props.onBlur && props.onBlur(e),
            }),
          })}
          className={clsx(
            className,
            'h-full w-full border-0 bg-transparent font-poppins text-body-base text-neutral-900 outline-none placeholder:text-neutral-500 ',
            error &&
              '[&:not(:focus)]:text-danger-base [&:not(:focus)]:placeholder:text-danger-base',
            props.disabled && 'disabled:cursor-not-allowed',
          )}
        />
        {rightIcon && rightIcon}
      </div>
      {error && <p className="text-danger-base text-xs mt-1 ml-1">*{error}</p>}
    </fieldset>
  )
}

export function PasswordField({ error, ...props }: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      rightIcon={
        <button
          type="button"
          className="flex h-full w-8 items-center justify-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeSlash className="h-5 w-5 text-neutral-600 " />
          ) : (
            <Eye className="h-5 w-5 text-neutral-600 " />
          )}
        </button>
      }
      error={error}
    />
  )
}

export const SearchField = ({
  value,
  onChange,
  placeholder,
  className,
  width = 'w-full',
  height = 'h-max',
}: {
  className?: string
  placeholder?: string
  value?: string
  width?: string
  height?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div className={clsx('relative', width, height)}>
      <input
        type="search"
        className={clsx(
          'block h-full w-full rounded-md border border-neutral-100 bg-transparent p-2 pl-10 font-poppins text-sm  text-neutral-900 outline-none transition-all duration-300 placeholder:text-neutral-300 focus:border-minera-dark-500',
          className,
        )}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 transform text-neutral-900 " />
    </div>
  )
}
