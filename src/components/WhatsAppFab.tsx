import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { company } from '../data/company'

/** Mobile-only WhatsApp button. Hides on /contact and while a `[data-hide-fab]` block (CTA band, footer) is on screen, so it never covers their buttons. */
export default function WhatsAppFab() {
  const { pathname } = useLocation()
  const [covered, setCovered] = useState(false)

  useEffect(() => {
    const targets = document.querySelectorAll('[data-hide-fab]')
    if (!targets.length || !('IntersectionObserver' in window)) return
    const inView = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? inView.add(e.target) : inView.delete(e.target)))
      setCovered(inView.size > 0)
    })
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [pathname])

  if (pathname === '/contact') return null

  return (
    <a
      href={company.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      aria-hidden={covered || undefined}
      tabIndex={covered ? -1 : undefined}
      className={`fixed bottom-4 right-4 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#128C7E] text-white shadow-lg transition duration-200 hover:brightness-110 md:hidden ${
        covered ? 'pointer-events-none translate-y-4 opacity-0' : ''
      }`}
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  )
}
