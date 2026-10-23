import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { Phone, X, ChevronRight, MessageCircle, ShieldCheck, type LucideIcon } from 'lucide-react'
import { company } from '../data/company'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
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
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity duration-200 starting:opacity-0"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Drops down from the top (not full-screen) */}
      <div className="on-navy relative max-h-full overflow-y-auto rounded-b-2xl bg-navy text-white shadow-2xl transition duration-200 ease-out starting:-translate-y-4 starting:opacity-0">
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-base font-extrabold">{company.shortName}</span>
            <span className="text-[11px] font-medium text-amber">A Grade Class‑1 Contractor</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="px-3 py-3">
          <ul className="space-y-1">
            {links.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors ${
                      isActive ? 'bg-white/10 text-amber' : 'text-white hover:bg-white/5'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                          isActive ? 'bg-amber text-navy' : 'bg-blue text-steel'
                        }`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="flex-1">{label}</span>
                      <ChevronRight className="h-4 w-4 text-white/40" aria-hidden="true" />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/10 px-4 pb-5 pt-4">
          <p className="mb-3 flex items-center gap-1.5 text-[11px] text-steel">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-amber" aria-hidden="true" />
            Licensed by TGSPDCL &amp; APEPDCL · above 33 kV
          </p>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${company.phones[0].tel}`}
              className="flex min-h-11 items-center justify-center gap-2 rounded-btn bg-amber px-3 text-sm font-semibold text-navy hover:brightness-95"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call
            </a>
            <a
              href={company.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-btn border border-white/30 px-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
          <p className="mt-2 text-center font-mono text-[11px] text-white/60">{company.phones[0].display}</p>
        </div>
      </div>
    </div>
  )
}
