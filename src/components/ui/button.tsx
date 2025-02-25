import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success'
  size?: 'icon' | 'sm' | 'md' | 'lg' | 'full'
  loading?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  loading,
  ...props
}: ButtonProps) {
  const baseStyle =
    'flex items-center gap-2 justify-center  transition-all duration-200 rounded-lg font-poppins font-medium text-xs sm:text-sm'

  const baseSize = {
    icon: 'h-9 w-9',
    sm: 'h-10 w-max px-2',
    md: 'h-10 w-max px-4',
    lg: 'h-12 w-max px-4',
    full: 'w-full h-12',
  }

  const baseVariants = {
    primary:
      'text-white bg-minera-dark-500 hover:bg-minera-dark-600  border border-[rgba(255,255,255,0.16)] shadow-button hover:shadow-button-hover disabled:bg-minera-dark-200 disabled:cursor-not-allowed',
    secondary:
      'bg-neutral-0 border border-neutral-100 hover:bg-neutral-100 text-minera-dark-500  disabled:text-neutral-300 ',
    danger: 'bg-danger-base text-white hover:bg-danger-dark ',
    ghost:
      'bg-transparent border border-neutral-100 text-neutral-600  hover:text-minera-dark hover:border-minera-dark-500 disabled:text-neutral-300 ',
    success:
      'text-white bg-success-base hover:bg-success-base/80  shadow-button hover:shadow-button-hover disabled:bg-success-base/60 disabled:cursor-not-allowed',
  }

  const buttonClasses = `${baseStyle} ${baseSize[size]} ${baseVariants[variant]}`

  return (
    <button
      {...props}
      className={`${props.disabled && 'cursor-not-allowed'} ${props.className} ${buttonClasses}  disabled:!cursor-not-allowed disabled:!opacity-75 disabled:text-neutral-300`}
      disabled={loading || props.disabled}
    >
      {loading ? (
        <div className="w-4 h-4 animate-spin rounded-full border-2 border-neutral-0 border-t-transparent border-b-transparent"></div>
      ) : (
        children
      )}
    </button>
  )
}
