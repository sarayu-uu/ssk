import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { Phone, X } from 'lucide-react'
import { company } from '../data/company'

export interface NavItem {
  to: string
  label: string
}

interface MobileNavProps {
  id: string
  open: boolean
  onClose: () => void
  links: NavItem[]
}

const FOCUSABLE = 'a[href], button:not([disabled])'

export default function MobileNav({ id, open, onClose, links }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    const previouslyFocused = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const items = panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previouslyFocused?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      id={id}
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
      className="fixed inset-0 z-50 lg:hidden"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className="relative max-h-full overflow-y-auto rounded-b-card bg-navy text-white shadow-lg">
        <div className="flex h-16 items-center justify-between px-4">
          <span className="font-heading text-base font-extrabold">{company.shortName}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-blue"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="px-4">
          <ul className="divide-y divide-white/10 border-t border-white/10">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex min-h-12 items-center text-base font-semibold ${
                      isActive ? 'text-amber' : 'text-white'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-4 pb-5 pt-3">
          <a
            href={`tel:${company.phones[0].tel}`}
            className="flex min-h-11 items-center justify-center gap-2 rounded-btn bg-amber px-4 text-sm font-semibold text-navy hover:brightness-95"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {company.phones[0].display}
          </a>
        </div>
      </div>
    </div>
  )
}
