import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ButtonProps {
  /** `light` = white outline, for navy backgrounds. */
  variant?: 'primary' | 'secondary' | 'light'
  /** `sm` is the compact header / inline size (still a 44px tap target). */
  size?: 'md' | 'sm'
  /** Internal route (`/contact`) renders a router Link; anything else an <a>. */
  href?: string
  external?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  ariaLabel?: string
  className?: string
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-btn font-semibold transition-colors disabled:opacity-70'
const sizes = {
  md: 'min-h-12 px-6',
  sm: 'min-h-11 px-4 text-sm',
}
const variants = {
  primary: 'bg-amber text-navy hover:brightness-95',
  secondary: 'border-2 border-navy text-navy hover:bg-navy hover:text-white',
  light: 'border-2 border-white text-white hover:bg-white hover:text-navy',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  onClick,
  type = 'button',
  disabled,
  ariaLabel,
  className = '',
  children,
}: ButtonProps) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`
  if (href) {
    if (href.startsWith('/') && !external) {
      return (
        <Link to={href} aria-label={ariaLabel} className={cls}>
          {children}
        </Link>
      )
    }
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel} className={cls}>
      {children}
    </button>
  )
}
