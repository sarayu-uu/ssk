import { useCallback, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Phone, Home, Building2, Wrench, Images, ShieldCheck, Mail } from 'lucide-react'
import { company } from '../data/company'
import MobileNav, { type NavItem } from './MobileNav'

const links: NavItem[] = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/about', label: 'About', icon: Building2 },
  { to: '/services', label: 'Services', icon: Wrench },
  { to: '/projects', label: 'Projects', icon: Images },
  { to: '/credentials', label: 'Credentials', icon: ShieldCheck },
  { to: '/contact', label: 'Contact', icon: Mail },
]

const MENU_ID = 'mobile-menu'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 bg-navy text-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4">
        <Link to="/" aria-label={company.name} className="flex min-h-11 min-w-0 items-center gap-2">
          <span className="flex flex-col leading-tight">
            <span className="whitespace-nowrap font-heading text-base font-extrabold sm:text-lg">SSK Electricals</span>
            <span className="whitespace-nowrap text-[10px] font-medium text-amber sm:text-[11px]">
              A Grade Class‑1 Contractor
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `inline-flex min-h-11 items-center rounded-btn px-3 text-sm font-medium transition-colors hover:bg-blue ${
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

        <div className="flex shrink-0 items-center gap-1">
          <a
            href={`tel:${company.phones[0].tel}`}
            className="hidden min-h-11 items-center gap-2 rounded-btn bg-amber px-4 text-sm font-semibold text-navy hover:brightness-95 lg:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {company.phones[0].display}
          </a>
          {/* Always-visible Call on mobile */}
          <a
            href={`tel:${company.phones[0].tel}`}
            aria-label={`Call ${company.phones[0].display}`}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-btn bg-amber px-3 text-xs font-bold text-navy hover:brightness-95 lg:hidden"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls={MENU_ID}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-blue lg:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileNav id={MENU_ID} open={open} onClose={close} links={links} />
    </header>
  )
}
