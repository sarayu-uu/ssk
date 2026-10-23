import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  /** Internal route (`/contact`) renders a router Link; anything else an <a>. */
  href?: string
  external?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  children: ReactNode
}

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-btn px-6 font-semibold transition-colors'
const variants = {
  primary: 'bg-amber text-navy hover:brightness-95',
  secondary: 'border-2 border-navy text-navy hover:bg-navy hover:text-white',
}

export default function Button({
  variant = 'primary',
  href,
  external,
  onClick,
  type = 'button',
  className = '',
  children,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`
  if (href) {
    if (href.startsWith('/') && !external) {
      return (
        <Link to={href} className={cls}>
          {children}
        </Link>
      )
    }
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
